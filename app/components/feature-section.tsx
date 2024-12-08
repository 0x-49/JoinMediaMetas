"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
}

interface FeatureSectionProps {
  features: Feature[];
}

const FeatureSection: React.FC<FeatureSectionProps> = ({ features }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <Card key={index} className="border-2">
          <CardHeader>
            <CardTitle className="text-xl">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureSection;
