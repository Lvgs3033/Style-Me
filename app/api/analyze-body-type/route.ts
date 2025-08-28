import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI("AIzaSyALON7WoIvEkqqSWkniFCMu3-DhOByBt8I")

async function tryRealAPI(imageBuffer: Buffer, mimeType: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `Analyze this full-body photo and determine the person's body type. Look carefully at the proportions between shoulders, waist, and hips.

IMPORTANT: If this is a group photo with multiple people, or if you cannot clearly see the full body, or if the image quality is too poor to make an accurate assessment, respond with: "UNCLEAR_IMAGE"

Body type categories to choose from:
1. HOURGLASS: Shoulders and hips are similar width, with a defined smaller waist
2. PEAR: Hips are wider than shoulders, smaller bust, defined waist
3. APPLE: Broader shoulders/bust, fuller midsection, narrower hips
4. RECTANGLE: Shoulders, waist, and hips are similar width, minimal curves
5. INVERTED_TRIANGLE: Broader shoulders than hips, athletic build

Respond in this exact JSON format:
{
  "bodyType": "one of the categories above",
  "confidence": "high/medium/low",
  "description": "brief description of the body proportions you observed",
  "recommendations": ["specific clothing item 1", "specific clothing item 2", "specific clothing item 3", "specific clothing item 4", "specific clothing item 5"],
  "tips": ["styling tip 1", "styling tip 2", "styling tip 3", "styling tip 4"]
}

Focus on accurate body type identification based on actual proportions visible in the image.`

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageBuffer.toString("base64"),
          mimeType: mimeType,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    if (text.includes("UNCLEAR_IMAGE")) {
      return {
        error: "UNCLEAR_IMAGE",
        message:
          "Please upload a clear, full-body photo taken from the front. Make sure you're the only person in the image and your full body is visible for accurate analysis.",
      }
    }

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const analysisResult = JSON.parse(jsonMatch[0])
      return {
        ...analysisResult,
        isDemo: false,
      }
    }

    throw new Error("Invalid response format")
  } catch (error) {
    console.error("Real API error:", error)
    throw error
  }
}

function getDemoResult() {
  const bodyTypeResults = [
    {
      bodyType: "HOURGLASS",
      confidence: "medium",
      description: "Well-balanced proportions with defined waist",
      recommendations: [
        "High-waisted skinny jeans",
        "Fitted blazers and wrap tops",
        "Bodycon and fit-and-flare dresses",
        "Wide belts to emphasize waist",
        "Pencil skirts and A-line dresses",
      ],
      tips: [
        "Emphasize your natural waistline with belts",
        "Choose fitted clothing over loose styles",
        "Avoid boxy or shapeless garments",
        "Highlight your curves with tailored pieces",
      ],
    },
    {
      bodyType: "PEAR",
      confidence: "medium",
      description: "Hips wider than shoulders with smaller bust",
      recommendations: [
        "A-line skirts and wide-leg pants",
        "Bootcut and straight-leg jeans",
        "Tops with horizontal stripes or patterns",
        "Statement sleeves and shoulder details",
        "High-waisted palazzo pants",
      ],
      tips: [
        "Balance proportions with statement tops",
        "Draw attention to your upper body with bright colors",
        "Avoid tight-fitting bottoms",
        "Choose darker colors for your lower half",
      ],
    },
    {
      bodyType: "APPLE",
      confidence: "medium",
      description: "Fuller midsection with broader shoulders",
      recommendations: [
        "Empire waist dresses and tops",
        "V-neck and scoop neck styles",
        "Straight-leg and bootcut jeans",
        "Long cardigans and open jackets",
        "A-line and shift dresses",
      ],
      tips: [
        "Create vertical lines to elongate your torso",
        "Emphasize your legs and décolletage",
        "Avoid tight clothing around the middle",
        "Choose flowing fabrics over clingy materials",
      ],
    },
    {
      bodyType: "RECTANGLE",
      confidence: "medium",
      description: "Straight silhouette with minimal curves",
      recommendations: [
        "Peplum tops and ruffled dresses",
        "Skinny jeans with textured tops",
        "Layered clothing and statement accessories",
        "Belted dresses and cropped jackets",
        "Bodycon dresses with strategic details",
      ],
      tips: [
        "Create curves with strategic styling and belts",
        "Add volume with layers and textures",
        "Use patterns and embellishments to add interest",
        "Experiment with different silhouettes",
      ],
    },
  ]

  return bodyTypeResults[Math.floor(Math.random() * bodyTypeResults.length)]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer())
    const mimeType = image.type

    try {
      const realResult = await tryRealAPI(imageBuffer, mimeType)

      if (realResult.error === "UNCLEAR_IMAGE") {
        return NextResponse.json(
          {
            error: realResult.message,
            requiresClearImage: true,
          },
          { status: 400 },
        )
      }

      return NextResponse.json(realResult)
    } catch (error) {
      // Fall back to demo mode if API fails
      const demoResult = getDemoResult()
      return NextResponse.json({
        ...demoResult,
        isDemo: true,
      })
    }
  } catch (error) {
    console.error("Body type analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze body type" }, { status: 500 })
  }
}
