import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Demo body type analysis results
    const bodyTypeResults = [
      {
        bodyType: "Hourglass - Curvy",
        description: "Well-balanced proportions with defined waist",
        recommendations: [
          "High-waisted jeans and skirts",
          "Fitted blazers and jackets",
          "Wrap dresses and tops",
          "Belt at the waist to emphasize curves",
          "A-line and fit-and-flare dresses",
        ],
        tips: [
          "Emphasize your natural waistline",
          "Choose fitted clothing over loose styles",
          "Avoid boxy or shapeless garments",
          "Highlight your curves with tailored pieces",
        ],
      },
      {
        bodyType: "Pear - Curvy Bottom",
        description: "Hips wider than shoulders with smaller bust",
        recommendations: [
          "A-line skirts and dresses",
          "Bootcut and wide-leg jeans",
          "Tops with horizontal stripes",
          "Statement sleeves and shoulder details",
          "High-waisted bottoms",
        ],
        tips: [
          "Balance proportions with statement tops",
          "Draw attention to your upper body",
          "Avoid tight-fitting bottoms",
          "Choose darker colors for bottom half",
        ],
      },
      {
        bodyType: "Apple - Full Figure",
        description: "Fuller midsection with broader shoulders",
        recommendations: [
          "Empire waist dresses",
          "V-neck and scoop neck tops",
          "Straight-leg and bootcut jeans",
          "Long cardigans and jackets",
          "A-line and shift dresses",
        ],
        tips: [
          "Create vertical lines to elongate",
          "Emphasize your legs and arms",
          "Avoid tight clothing around the middle",
          "Choose flowing fabrics over clingy ones",
        ],
      },
      {
        bodyType: "Rectangle - Skinny",
        description: "Straight silhouette with minimal curves",
        recommendations: [
          "Peplum tops and dresses",
          "Skinny and straight-leg jeans",
          "Layered clothing and textures",
          "Belted dresses and tops",
          "Ruffles and embellishments",
        ],
        tips: [
          "Create curves with strategic styling",
          "Add volume with layers and textures",
          "Use belts to define your waist",
          "Experiment with different silhouettes",
        ],
      },
    ]

    // Return a random result for demo
    const randomResult = bodyTypeResults[Math.floor(Math.random() * bodyTypeResults.length)]

    return NextResponse.json({
      ...randomResult,
      isDemo: true,
    })
  } catch (error) {
    console.error("Body type analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze body type" }, { status: 500 })
  }
}
