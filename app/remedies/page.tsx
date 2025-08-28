"use client"

import { useState, useMemo } from "react"
import { Search, Sparkles, Leaf, Heart, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const remedies = [
  {
    id: 1,
    title: "Rice Face Mask & Toner",
    category: "Face Care",
    tags: ["brightening", "toning", "natural"],
    ingredients: ["Rice", "Honey", "Rose water", "Milk"],
    instructions: [
      "Take good quality rice, wash it three times, and soak for 30 minutes",
      "Blend the rice well, then add honey and rose water",
      "You can also add milk for extra nourishment",
      "Apply the mixture to your skin",
    ],
    forToner: "Soak rice in water overnight, mix well, filter into container. Add rose water if desired.",
    time: "30 minutes prep + 15 minutes application",
    frequency: "2-3 times per week",
  },
  {
    id: 2,
    title: "Tan Removal Pack",
    category: "Tan Removal",
    tags: ["tan removal", "exfoliation", "brightening"],
    ingredients: ["Sugar", "Coffee", "Rice flour", "Turmeric", "Honey", "Coconut oil", "Aloe vera gel"],
    instructions: [
      "Mix 3/4 cup sugar with 1/4 cup coffee for scrub",
      "Alternative: Mix rice flour, turmeric, honey, and 2-3 drops coconut oil",
      "Add aloe vera gel, body wash, milk, and rose water",
      "Apply to damp skin, massage for 5 minutes",
      "Wash off with cold water",
    ],
    time: "10 minutes",
    frequency: "2-3 times per week",
  },
  {
    id: 3,
    title: "Dark Circles Treatment",
    category: "Eye Care",
    tags: ["dark circles", "hydration", "anti-aging"],
    ingredients: ["Vaseline", "Potato juice", "Ice cubes", "Coffee", "Aloe vera", "Almond oil", "Honey"],
    instructions: [
      "Apply Vaseline at night for hydration",
      "Use fresh potato juice daily",
      "Apply ice cubes to reduce puffiness",
      "Mix coffee, aloe vera, almond oil, and honey for a nourishing pack",
      "Drink plenty of water and get proper sleep",
    ],
    time: "15-20 minutes",
    frequency: "Daily",
  },
  {
    id: 4,
    title: "Attractive Lips Care",
    category: "Lip Care",
    tags: ["lip care", "moisturizing", "natural pink"],
    ingredients: ["Coconut oil", "Honey", "Milk cream", "Turmeric", "Tomato juice", "Beetroot juice", "Sugar", "Lemon"],
    instructions: [
      "Coconut oil + honey pack for 15-20 minutes",
      "Milk cream + turmeric for 10-15 minutes",
      "Tomato juice + honey for few minutes",
      "Beetroot juice + aloe vera gel overnight",
      "Sugar + lemon + honey scrub for exfoliation",
    ],
    time: "10-20 minutes",
    frequency: "3-4 times per week",
  },
  {
    id: 5,
    title: "Hair Damage Repair",
    category: "Hair Care",
    tags: ["damaged hair", "nourishing", "repair"],
    ingredients: ["Aloe vera gel", "Honey", "Coconut oil", "Curd", "Banana", "Onion water"],
    instructions: [
      "Mix aloe vera gel, honey, and coconut oil for deep conditioning",
      "Alternative: Curd, banana, and aloe vera mask",
      "Apply coconut oil for smooth hair",
      "Use onion water for hair growth",
      "Leave masks for 30-45 minutes before washing",
    ],
    time: "30-45 minutes",
    frequency: "Once per week",
  },
  {
    id: 6,
    title: "Teeth Whitening",
    category: "Oral Care",
    tags: ["teeth whitening", "natural", "oral hygiene"],
    ingredients: ["Turmeric", "Salt", "Baking soda", "Lemon juice", "Coconut oil", "Banana peel"],
    instructions: [
      "Mix turmeric and salt for gentle whitening",
      "Baking soda + lemon juice + coconut oil paste",
      "Mashed banana peel + salt + lemon + toothpaste",
      "Coconut oil pulling for 10-15 minutes",
      "Use 2-3 times per week maximum",
    ],
    time: "5-15 minutes",
    frequency: "2-3 times per week",
  },
  {
    id: 7,
    title: "Acne Treatment",
    category: "Face Care",
    tags: ["acne", "anti-bacterial", "oil control"],
    ingredients: ["Rice water", "Ice cubes", "Neem", "Turmeric", "Honey"],
    instructions: [
      "Use rice water ice cubes on affected areas",
      "Steam face with neem leaves",
      "Apply turmeric and honey paste",
      "Use gentle circular motions",
      "Rinse with lukewarm water",
    ],
    time: "15-20 minutes",
    frequency: "Daily for ice cubes, 2-3 times per week for masks",
  },
  {
    id: 8,
    title: "Body Exfoliation",
    category: "Body Care",
    tags: ["exfoliation", "smooth skin", "body care"],
    ingredients: ["Coffee", "Sugar", "Honey", "Body wash", "Coconut oil"],
    instructions: [
      "Mix coffee, sugar, honey, and body wash",
      "Apply to damp skin in circular motions",
      "Focus on rough areas like elbows and knees",
      "Rinse with warm water",
      "Follow with moisturizer",
    ],
    time: "10-15 minutes",
    frequency: "2-3 times per week",
  },
  {
    id: 9,
    title: "Dull Elbows & Knees Lightening",
    category: "Body Care",
    tags: ["lightening", "exfoliation", "dark spots"],
    ingredients: ["Lemon", "Potato juice", "Turmeric", "Baking soda", "Honey", "Coconut oil", "Gram flour"],
    instructions: [
      "Mix lemon and potato juice with turmeric",
      "Alternative: Lemon and baking soda scrub",
      "Baking soda + lemon + honey + coconut oil paste",
      "Gram flour + baking soda + rose water pack",
      "Apply and leave for 15-20 minutes",
    ],
    time: "15-20 minutes",
    frequency: "3-4 times per week",
  },
  {
    id: 10,
    title: "Leg Spa Treatment",
    category: "Body Care",
    tags: ["foot care", "spa", "whitening", "exfoliation"],
    ingredients: ["Baking soda", "Shampoo", "Sugar", "Honey", "Coconut oil", "Lemon", "Toothpaste"],
    instructions: [
      "Cut and shape nails",
      "Soak legs in warm water with baking soda and shampoo for 10 minutes",
      "Scrub with sugar, honey, coconut oil, and body wash",
      "Exfoliate to remove dead skin",
      "Apply baking soda + lemon + toothpaste paste until dry",
      "Finish with moisturizer",
    ],
    time: "30-45 minutes",
    frequency: "Once per week",
  },
]

const categories = ["All", "Face Care", "Hair Care", "Body Care", "Eye Care", "Lip Care", "Tan Removal", "Oral Care"]

export default function RemediesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredRemedies = useMemo(() => {
    return remedies.filter((remedy) => {
      const matchesSearch =
        remedy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        remedy.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
        remedy.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === "All" || remedy.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-pink-600 bg-clip-text text-transparent">
                Natural Beauty Remedies
              </h1>
              <Sparkles className="h-8 w-8 text-pink-600" />
            </div>
            <p className="text-gray-600 text-lg">Discover natural solutions for all your beauty concerns</p>
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search remedies, ingredients, or concerns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-2 border-green-200 focus:border-green-400 rounded-full"
            />
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-green-100/50">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-green-500 data-[state=active]:text-white text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            Found <span className="font-semibold text-green-600">{filteredRemedies.length}</span> remedies
          </p>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="text-sm text-gray-600">All natural ingredients</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRemedies.map((remedy, index) => (
            <Card
              key={remedy.id}
              className="group hover:shadow-xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 bg-white/80 backdrop-blur-sm"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                    {remedy.category}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">Natural</span>
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-800 group-hover:text-green-700 transition-colors">
                  {remedy.title}
                </CardTitle>
                <div className="flex flex-wrap gap-1 mt-2">
                  {remedy.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-pink-200 text-pink-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-green-600" />
                    Ingredients
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {remedy.ingredients.map((ingredient) => (
                      <span
                        key={ingredient}
                        className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Instructions</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {remedy.instructions.slice(0, 3).map((instruction, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0"></span>
                        {instruction}
                      </li>
                    ))}
                    {remedy.instructions.length > 3 && (
                      <li className="text-green-600 font-medium">+ {remedy.instructions.length - 3} more steps</li>
                    )}
                  </ul>
                </div>

                {/* Additional Info */}
                {remedy.forToner && (
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-1">For Toner:</h5>
                    <p className="text-sm text-blue-700">{remedy.forToner}</p>
                  </div>
                )}

                {/* Time & Frequency */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Time</p>
                    <p className="text-sm font-medium text-gray-700">{remedy.time}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Frequency</p>
                    <p className="text-sm font-medium text-gray-700">{remedy.frequency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRemedies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No remedies found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
