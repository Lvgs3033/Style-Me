"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Sparkles, ArrowLeft, Play, Heart, Star } from "lucide-react"

export default function MakeupGuidance() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setError("")
      setAnalysisResult(null)
    }
  }

  const analyzeMakeupStyle = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError("")
    setProgress(0)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)

      const response = await fetch("/api/analyze-makeup", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error(result.error || "Analysis failed")
      }

      setAnalysisResult(result)
    } catch (err) {
      clearInterval(progressInterval)
      setError(err instanceof Error ? err.message : "An error occurred during analysis")
    } finally {
      setIsAnalyzing(false)
      setTimeout(() => setProgress(0), 1000)
    }
  }

  const popularMakeupStyles = [
    {
      name: "Natural Everyday Look",
      description: "Fresh, minimal makeup for daily wear",
      videoId: "dQw4w9WgXcQ",
      steps: ["Light foundation", "Neutral eyeshadow", "Mascara", "Lip balm"],
    },
    {
      name: "Smoky Eye",
      description: "Classic dramatic evening look",
      videoId: "dQw4w9WgXcQ",
      steps: ["Dark eyeshadow blend", "Winged eyeliner", "False lashes", "Bold lip"],
    },
    {
      name: "Glam Night Out",
      description: "Full glam with shimmer and bold colors",
      videoId: "dQw4w9WgXcQ",
      steps: ["Full coverage foundation", "Glittery eyeshadow", "Contouring", "Glossy lips"],
    },
    {
      name: "Korean Glass Skin",
      description: "Dewy, radiant skin-focused look",
      videoId: "dQw4w9WgXcQ",
      steps: ["Hydrating primer", "Light coverage", "Cream blush", "Glossy finish"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 dark:from-gray-900 dark:via-pink-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Button onClick={() => (window.location.href = "/")} variant="ghost" className="mb-6 hover:bg-pink-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="h-10 w-10 text-pink-600 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
              Makeup Guidance
            </h1>
            <Heart className="h-10 w-10 text-rose-600 animate-bounce" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Upload a makeup look you love and get step-by-step tutorials to recreate it perfectly!
          </p>
        </div>

        <Tabs defaultValue="analyze" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 h-14 bg-gradient-to-r from-pink-100 to-rose-100">
            <TabsTrigger value="analyze" className="text-base font-medium">
              📸 Analyze Makeup Look
            </TabsTrigger>
            <TabsTrigger value="popular" className="text-base font-medium">
              ✨ Popular Styles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="mt-8">
            {/* Upload Section */}
            <Card className="mb-8 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20">
                <CardTitle className="text-2xl text-center">Upload Makeup Look</CardTitle>
                <CardDescription className="text-center text-base">
                  Upload a photo of a makeup look you want to recreate
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div
                    className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center hover:border-pink-400 transition-colors cursor-pointer bg-pink-50/50 hover:bg-pink-100/50"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mx-auto h-12 w-12 text-pink-500 mb-4" />
                    <p className="text-lg font-medium text-pink-700 mb-2">
                      {selectedImage ? selectedImage.name : "Click to upload makeup photo"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Upload a clear photo of the makeup look you want to learn
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    {selectedImage && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage(null)
                          setAnalysisResult(null)
                          setError("")
                        }}
                        variant="destructive"
                        size="sm"
                        className="mt-4"
                      >
                        Remove Photo
                      </Button>
                    )}
                  </div>

                  {selectedImage && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(selectedImage) || "/placeholder.svg"}
                        alt="Selected makeup look"
                        className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                      />
                    </div>
                  )}

                  <Button
                    onClick={analyzeMakeupStyle}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Makeup Look"}
                  </Button>

                  {isAnalyzing && (
                    <div className="space-y-2">
                      <Progress value={progress} className="w-full" />
                      <p className="text-center text-sm text-muted-foreground">
                        Analyzing makeup style and finding tutorials...
                      </p>
                    </div>
                  )}

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            {analysisResult && (
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                  <CardTitle className="text-2xl text-center">Makeup Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-pink-700">Detected Style</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
                          {analysisResult.style}
                        </Badge>
                        <p className="text-sm text-muted-foreground mb-4">{analysisResult.description}</p>
                        <div className="space-y-2">
                          <h4 className="font-semibold">Key Features:</h4>
                          <ul className="space-y-1">
                            {analysisResult.features.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <Star className="h-4 w-4 text-pink-500" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-rose-700 flex items-center gap-2">
                          <Play className="h-5 w-5" />
                          Tutorial Video
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <Button
                            onClick={() =>
                              window.open(`https://youtube.com/watch?v=${analysisResult.videoId}`, "_blank")
                            }
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Watch on YouTube
                          </Button>
                        </div>
                        <h4 className="font-semibold mb-2">Step-by-Step Guide:</h4>
                        <ol className="space-y-2">
                          {analysisResult.steps.map((step: string, index: number) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <span className="bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {index + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="popular" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {popularMakeupStyles.map((style, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50">
                    <CardTitle className="text-pink-700">{style.name}</CardTitle>
                    <CardDescription>{style.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-4">
                      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Button
                          onClick={() => window.open(`https://youtube.com/watch?v=${style.videoId}`, "_blank")}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <Play className="mr-2 h-4 w-4" />
                          Watch Tutorial
                        </Button>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Quick Steps:</h4>
                        <ul className="space-y-1">
                          {style.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
