-- SQL Query to Find "Ghost" Duplicate Installers
-- These are installers with company names ending in -2, -3, etc.
-- Run this query in your Supabase SQL Editor

-- ============================================
-- STEP 1: Find all potential duplicate entries
-- These have company_name ending in -2, -3, etc.
-- ============================================
SELECT
    id,
    company_name,
    name,
    location_city,
    location_state,
    phone,
    created_at,
    -- Extract the base name without the -N suffix
    REGEXP_REPLACE(company_name, '-[0-9]+$', '') AS base_company_name
FROM installers
WHERE company_name ~ '-[0-9]+$'
ORDER BY company_name;

-- ============================================
-- STEP 2: Find duplicates with their "original" entries
-- This joins potential duplicates to their originals
-- ============================================
WITH duplicates AS (
    SELECT
        id,
        company_name,
        name,
        location_city,
        phone,
        created_at,
        REGEXP_REPLACE(company_name, '-[0-9]+$', '') AS base_name
    FROM installers
    WHERE company_name ~ '-[0-9]+$'
),
originals AS (
    SELECT
        id,
        company_name,
        name,
        location_city,
        phone,
        created_at
    FROM installers
    WHERE NOT (company_name ~ '-[0-9]+$')
)
SELECT
    d.id AS duplicate_id,
    d.company_name AS duplicate_name,
    d.phone AS duplicate_phone,
    d.created_at AS duplicate_created,
    o.id AS original_id,
    o.company_name AS original_name,
    o.phone AS original_phone,
    o.created_at AS original_created,
    CASE
        WHEN o.id IS NOT NULL THEN 'SAFE TO DELETE - Original exists'
        ELSE 'REVIEW - No matching original found'
    END AS action_recommendation
FROM duplicates d
LEFT JOIN originals o ON LOWER(d.base_name) = LOWER(o.company_name)
ORDER BY d.base_name, d.company_name;

-- ============================================
-- STEP 3: Generate DELETE statements for confirmed duplicates
-- REVIEW OUTPUT BEFORE RUNNING!
-- ============================================
SELECT
    'DELETE FROM installers WHERE id = ''' || d.id || '''; -- ' || d.company_name AS delete_statement
FROM (
    SELECT
        id,
        company_name,
        REGEXP_REPLACE(company_name, '-[0-9]+$', '') AS base_name
    FROM installers
    WHERE company_name ~ '-[0-9]+$'
) d
INNER JOIN installers o ON LOWER(d.base_name) = LOWER(o.company_name)
WHERE NOT (o.company_name ~ '-[0-9]+$');

-- ============================================
-- STEP 4: Count summary
-- ============================================
SELECT
    COUNT(*) FILTER (WHERE company_name ~ '-[0-9]+$') AS potential_duplicates,
    COUNT(*) FILTER (WHERE NOT (company_name ~ '-[0-9]+$')) AS original_entries,
    COUNT(*) AS total_installers
FROM installers;
