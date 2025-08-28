"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Upload, User, ArrowLeft, Crown, Star, Shirt } from "lucide-react"

export default function BodyTypeAnalysis() {
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

  const analyzeBodyType = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    setError("")
    setProgress(0)

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    try {
      const formData = new FormData()
      formData.append("image", selectedImage)

      const response = await fetch("/api/analyze-body-type", {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Button onClick={() => (window.location.href = "/")} variant="ghost" className="mb-6 hover:bg-blue-100">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <div className="flex items-center justify-center gap-3 mb-6">
            <User className="h-10 w-10 text-blue-600 animate-pulse" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Body Type Analysis
            </h1>
            <Crown className="h-10 w-10 text-purple-600 animate-bounce" />
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover your body type and get personalized clothing recommendations that flatter your unique figure!
          </p>
        </div>

        {/* Upload Section */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardTitle className="text-2xl text-center">Upload Your Photo</CardTitle>
            <CardDescription className="text-center text-base">
              Upload a full-body photo for accurate body type analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50 hover:bg-blue-100/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
                <p className="text-lg font-medium text-blue-700 mb-2">
                  {selectedImage ? selectedImage.name : "Click to upload your photo"}
                </p>
                <p className="text-sm text-muted-foreground">
                  For best results, use a full-body photo with good lighting
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
                    alt="Selected"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}

              <Button
                onClick={analyzeBodyType}
                disabled={!selectedImage || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Body Type"}
              </Button>

              {isAnalyzing && (
                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <p className="text-center text-sm text-muted-foreground">
                    Analyzing your body type and generating recommendations...
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

        {/* Results */}
        {analysisResult && (
          <div className="max-w-6xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardTitle className="text-2xl text-center">Your Body Type Analysis</CardTitle>
                <CardDescription className="text-center text-base">
                  Personalized recommendations for your unique figure
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardTitle className="text-purple-700">Your Body Type</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="text-center">
                        <Badge variant="secondary" className="text-xl px-6 py-3 mb-4">
                          {analysisResult.bodyType}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{analysisResult.description}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                      <CardTitle className="text-green-700 flex items-center gap-2">
                        <Shirt className="h-5 w-5" />
                        Best Clothing Styles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {analysisResult.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                      <CardTitle className="text-orange-700">Style Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <ul className="space-y-2">
                        {analysisResult.tips.map((tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span>
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
