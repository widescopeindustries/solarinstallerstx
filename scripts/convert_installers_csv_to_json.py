#!/usr/bin/env python3
"""
Convert semicolon-separated installer CSV (misnamed .json) in public/installers.json
into a proper JSON array and overwrite the file.

Usage: run this script from the repository (it's self-contained).
"""
import csv
import json
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "public" / "installers.json"


def parse_value(key: str, raw: str) -> Any:
    if raw is None:
        return None
    v = raw.strip()
    if v == "" or v.upper() in ("NULL", "NONE"):
        return None

    # booleans
    if v.lower() in ("true", "false"):
        return v.lower() == "true"

    # arrays encoded like [] or ["a","b"]
    if (v.startswith("[") and v.endswith("]")):
        try:
            return json.loads(v.replace("\t", ""))
        except Exception:
            # fallback: strip brackets and split on comma
            inner = v[1:-1].strip()
            if not inner:
                return []
            return [x.strip().strip('"').strip("'") for x in inner.split(",")]

    # numeric fields
    if key in ("rating",):
        try:
            return float(v)
        except Exception:
            return None
    if key in ("review_count", "years_in_business"):
        try:
            return int(float(v))
        except Exception:
            return None
    if key in ("latitude", "longitude"):
        try:
            return float(v)
        except Exception:
            return None

    # default: return trimmed string
    return v


def convert():
    if not INPUT.exists():
        raise SystemExit(f"Input file not found: {INPUT}")

    text = INPUT.read_text(encoding="utf-8")
    # Normalize DOS/Windows tabs that sometimes precede phone numbers
    text = text.replace("\t", "")

    # Use csv reader with semicolon delimiter
    lines = [l for l in text.splitlines() if l.strip() != ""]
    reader = csv.reader(lines, delimiter=";")
    try:
        headers = next(reader)
    except StopIteration:
        raise SystemExit("Input appears empty")

    headers = [h.strip() for h in headers]

    records = []
    for i, row in enumerate(reader, start=2):
        # Some rows may have fewer fields; pad with empty strings
        if len(row) < len(headers):
            row += [""] * (len(headers) - len(row))
        # Or more fields: join extras into last field
        if len(row) > len(headers):
            # join extras into the last column
            row = row[: len(headers) - 1] + [";".join(row[len(headers) - 1 :])]

        obj = {}
        for key, raw in zip(headers, row):
            obj[key] = parse_value(key, raw)

        records.append(obj)

    # Write JSON back
    out_text = json.dumps(records, ensure_ascii=False, indent=2)
    INPUT.write_text(out_text, encoding="utf-8")

    # print brief summary
    print(f"Converted {len(records)} records into JSON: {INPUT}")
    sample = records[:3]
    print("Sample records:")
    print(json.dumps(sample, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    convert()
