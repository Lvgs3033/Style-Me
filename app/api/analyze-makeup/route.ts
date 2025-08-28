import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Demo makeup analysis results
    const makeupStyles = [
      {
        style: "Natural Everyday Look",
        description: "Fresh, minimal makeup perfect for daily wear with a focus on enhancing natural features",
        features: [
          "Light, dewy foundation",
          "Neutral brown eyeshadow",
          "Defined but natural brows",
          "Subtle pink blush",
          "Nude or pink lip color",
        ],
        steps: [
          "Apply lightweight foundation or tinted moisturizer",
          "Use concealer only where needed",
          "Apply neutral eyeshadow in matte finish",
          "Define brows with a brow pencil",
          "Add a coat of brown or black mascara",
          "Apply cream blush to the apples of cheeks",
          "Finish with a nude or pink lip color",
        ],
        videoId: "dQw4w9WgXcQ",
        difficulty: "Beginner",
      },
      {
        style: "Smoky Eye Glam",
        description: "Classic dramatic evening look with sultry, smoky eyes and bold definition",
        features: [
          "Dark, blended eyeshadow",
          "Winged eyeliner",
          "False lashes or heavy mascara",
          "Contoured cheeks",
          "Bold or nude lip",
        ],
        steps: [
          "Prime eyelids and set with powder",
          "Apply dark eyeshadow to outer corner and crease",
          "Blend upward and outward for smoky effect",
          "Line eyes with black eyeliner, creating a wing",
          "Apply false lashes or multiple coats of mascara",
          "Contour cheeks with bronzer",
          "Choose either bold red lips or nude to balance the eyes",
        ],
        videoId: "dQw4w9WgXcQ",
        difficulty: "Intermediate",
      },
      {
        style: "Korean Glass Skin",
        description: "Dewy, radiant skin-focused look emphasizing a healthy, glowing complexion",
        features: [
          "Extremely dewy, glass-like skin",
          "Minimal eye makeup",
          "Gradient lip effect",
          "Subtle cream blush",
          "Highlighted inner corners",
        ],
        steps: [
          "Apply hydrating primer for dewy base",
          "Use light coverage foundation or BB cream",
          "Apply cream highlighter to high points of face",
          "Use cream blush for natural flush",
          "Apply subtle eyeshadow in neutral tones",
          "Highlight inner corners of eyes",
          "Create gradient lips with lip tint",
          "Set with dewy setting spray",
        ],
        videoId: "dQw4w9WgXcQ",
        difficulty: "Beginner",
      },
      {
        style: "Bold Glam Night Out",
        description: "Full glam with shimmer, bold colors, and dramatic features for special occasions",
        features: [
          "Full coverage foundation",
          "Glittery or metallic eyeshadow",
          "Heavy contouring and highlighting",
          "Bold lip color",
          "Dramatic lashes",
        ],
        steps: [
          "Apply full coverage foundation",
          "Contour and highlight face dramatically",
          "Apply glittery eyeshadow with glitter glue",
          "Create dramatic winged eyeliner",
          "Apply false lashes or lash extensions",
          "Use bold blush or bronzer",
          "Apply bold lipstick in red, berry, or nude",
          "Set everything with setting spray",
        ],
        videoId: "dQw4w9WgXcQ",
        difficulty: "Advanced",
      },
    ]

    // Return a random result for demo
    const randomResult = makeupStyles[Math.floor(Math.random() * makeupStyles.length)]

    return NextResponse.json({
      ...randomResult,
      isDemo: true,
      confidence: "85%",
      similarStyles: makeupStyles
        .filter((s) => s.style !== randomResult.style)
        .slice(0, 2)
        .map((s) => s.style),
    })
  } catch (error) {
    console.error("Makeup analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze makeup style" }, { status: 500 })
  }
}
