"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const AFFILIATE_LINK = "https://whop.com/media-metas-f4/?a=digitalartlab";

const plans = [
  {
    name: "Free Access",
    price: "Free",
    type: "once",
    description: "Start your journey with fellow creators",
    features: [
      "Work together with fellow creators",
      "Elevate your content",
      "Connect with creators",
      "Build inspiring relationships",
      "Get motivated by the community"
    ]
  },
  {
    name: "Media Metas Monthly",
    price: "$40",
    type: "month",
    description: "Complete access to all features and support",
    features: [
      "Video tutorials from Musa and professionals",
      "Weekly and monthly professional calls",
      "24/7 algorithmic help from specialists",
      "Step-by-step tutorials (mobile & PC)",
      "Access to editing pre-set packs"
    ],
    popular: true
  },
  {
    name: "Media Metas Lifetime",
    price: "$400",
    type: "once",
    description: "One-time payment for lifetime access",
    features: [
      "All Monthly Plan Features",
      "Lifetime Access",
      "No Monthly Payments",
      "Future Updates Included",
      "Priority Support"
    ]
  },
  {
    name: "Media Metas Clips",
    price: "$496.99",
    type: "once",
    description: "Advanced content creation and strategy",
    features: [
      "24/7 algorithmic help for optimization",
      "Daily viral content strategies",
      "Monthly professional calls",
      "Personalized guidance",
      "Industry professional insights"
    ]
  }
];

export default function PricingPage() {
  const handleCTAClick = () => {
    window.open(AFFILIATE_LINK, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Choose Your Path to Success
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Select the plan that best fits your goals and start your journey to TikTok success today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${
              plan.popular 
                ? 'border-2 border-pink-500 shadow-lg md:scale-105' 
                : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.type === 'month' && (
                  <span className="text-gray-600 dark:text-gray-400"> /month</span>
                )}
                {plan.type === 'once' && plan.price !== 'Free' && (
                  <span className="text-gray-600 dark:text-gray-400"> one-time</span>
                )}
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className={`w-full ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600'
                    : ''
                }`}
                variant={plan.popular ? 'default' : 'outline'}
                onClick={handleCTAClick}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Join thousands of successful creators today
        </p>
        <Button 
          variant="link" 
          onClick={handleCTAClick}
        >
          Have questions? Contact us
        </Button>
      </div>
    </div>
  );
}
