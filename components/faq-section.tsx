"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Do I need experience to start?",
    answer: "Absolutely not! Musa's strategies are designed for beginners. Everything is broken down step-by-step, so you'll learn as you go."
  },
  {
    question: "How long does it take to make money?",
    answer: "Many members see results within weeks. The more effort you put in, the faster you'll start earning. Some have made $5,000 in their first month!"
  },
  {
    question: "What tools do I need?",
    answer: "All you need is a smartphone and access to free tools like CapCut and Crayo AI, both of which are covered in the program."
  },
  {
    question: "How much can I realistically earn?",
    answer: "There's no limit. Members have made anywhere from $1,000 to $60,000 a month, depending on their consistency and strategy."
  }
];

export function FAQSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6">
      {faqs.map((faq, index) => (
        <Card 
          key={index}
          className="transition-all duration-300 hover:shadow-lg cursor-pointer"
          onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
        >
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-semibold flex justify-between items-center">
              {faq.question}
              {expandedIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className={`px-4 overflow-hidden transition-all duration-300 ${
            expandedIndex === index ? 'max-h-48 pb-4' : 'max-h-0 pb-0'
          }`}>
            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
