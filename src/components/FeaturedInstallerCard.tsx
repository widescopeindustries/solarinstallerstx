import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { generateInstallerSlug, generateCitySlug } from "@/lib/slugify";

interface FeaturedInstallerCardProps {
    id: string | number;
    name: string;
    company_name: string;
    location_city: string;
    location_state: string;
    reviewCount: number;
    rating: number;
    slug: string;
}

export const FeaturedInstallerCard = ({
    id,
    name,
    company_name,
    location_city,
    location_state,
    reviewCount,
    rating,
    slug
}: FeaturedInstallerCardProps) => {
    const nameSlug = generateInstallerSlug(company_name, name);
    const citySlug = generateCitySlug(location_city);
    const newPath = `/installers/${citySlug}/${nameSlug}`;
    return (
        <Card className="border-primary border-2 shadow-lg relative overflow-hidden">
            <Badge variant="secondary" className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 font-bold">
                <Crown className="h-4 w-4 mr-1" />
                Featured
            </Badge>
            <CardHeader>
                <CardTitle className="text-xl">{company_name || name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{location_city}, {location_state}</p>
                <div className="flex items-center mt-2">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-bold">{rating}</span>
                    <span className="text-muted-foreground ml-1">({reviewCount} reviews)</span>
                </div>
                <Button asChild className="mt-4 w-full">
                    <Link to={newPath}>View Profile</Link>
                </Button>
            </CardContent>
        </Card>
    )
}
