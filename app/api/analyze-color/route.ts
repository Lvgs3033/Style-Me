import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI("AIzaSyALON7WoIvEkqqSWkniFCMu3-DhOByBt8I")

const colorToHex: { [key: string]: string } = {
  // Reds
  "Pure Red": "#FF0000",
  "Bright Red": "#DC143C",
  "Deep Red": "#8B0000",
  "Hot Pink": "#FF1493",
  Magenta: "#FF00FF",
  Coral: "#FF7F50",
  "Brick Red": "#CB4154",
  Burgundy: "#800020",

  // Blues
  "Royal Navy": "#002366",
  "Navy Blue": "#000080",
  "Sky Blue": "#87CEEB",
  "Powder Blue": "#B0E0E6",
  "Icy Blue": "#B6D7FF",
  "Electric Blue": "#7DF9FF",
  "Deep Teal": "#003366",

  // Greens
  "Emerald Green": "#50C878",
  "Forest Green": "#228B22",
  "Mint Green": "#98FB98",
  "Sage Green": "#9CAF88",
  "Olive Green": "#808000",

  // Yellows/Golds
  "Golden Yellow": "#FFD700",
  "Mustard Yellow": "#FFDB58",
  "Bright Yellow": "#FFFF00",

  // Oranges
  Orange: "#FFA500",
  "Rust Orange": "#B7410E",
  "Burnt Sienna": "#E97451",
  Peach: "#FFCBA4",
  "Burnt Orange": "#CC5500",

  // Purples
  "Deep Purple": "#663399",
  Lavender: "#E6E6FA",
  Mauve: "#E0B0FF",
  "Cool Purple": "#9966CC",

  // Neutrals
  "Pure White": "#FFFFFF",
  "Pearl White": "#F8F6F0",
  "True Black": "#000000",
  "Silver Gray": "#C0C0C0",
  "Soft Gray": "#D3D3D3",
  "Cool Gray": "#808080",
  Cream: "#FFFDD0",
  Beige: "#F5F5DC",
  Camel: "#C19A6B",

  // Browns
  "Chocolate Brown": "#7B3F00",
  "Warm Brown": "#964B00",
  "Golden Brown": "#996515",
  Terracotta: "#E2725B",

  // Pinks
  "Soft Pink": "#FFB6C1",
  "Rose Pink": "#FF66CC",
  "Dusty Rose": "#DCAE96",
  "Cool Pink": "#FF69B4",

  // Default fallback
  default: "#6B7280",
}

function getColorHex(colorName: string): string {
  // Try exact match first
  if (colorToHex[colorName]) {
    return colorToHex[colorName]
  }

  // Try partial matches
  const lowerColorName = colorName.toLowerCase()
  for (const [key, value] of Object.entries(colorToHex)) {
    if (key.toLowerCase().includes(lowerColorName) || lowerColorName.includes(key.toLowerCase())) {
      return value
    }
  }

  // Fallback to gray
  return colorToHex["default"]
}

function generateDemoAnalysis() {
  const demoResults = [
    {
      skinTone: "Fair skin with cool pink undertones and high contrast",
      undertone: "cool",
      season: "Winter",
      bodyType: "Hourglass - Curvy",
      confidence: "high",
      bestColors: [
        "Pure White",
        "True Black",
        "Royal Navy",
        "Emerald Green",
        "Hot Pink",
        "Deep Purple",
        "Bright Red",
        "Icy Blue",
        "Silver Gray",
        "Magenta",
      ],
      avoidColors: [
        "Beige",
        "Camel",
        "Orange",
        "Golden Yellow",
        "Warm Brown",
        "Peach",
        "Coral",
        "Olive Green",
        "Rust Orange",
        "Mustard Yellow",
      ],
      colorAnalysis:
        "Your high contrast coloring (fair skin with dark features) suits bold, clear colors. Cool undertones mean you look best in colors with blue or pink bases rather than yellow or orange bases. Avoid warm, muted colors that will wash you out.",
      clothingRecommendations: {
        casual: [
          "High-waisted skinny jeans with fitted crop tops",
          "Wrap dresses that cinch at the waist",
          "Fitted blazers with straight-leg trousers",
          "Bodycon midi dresses",
          "Belted cardigans with pencil skirts",
        ],
        formal: [
          "Tailored sheath dresses that follow your curves",
          "Fitted blazer suits with pencil skirts",
          "Wrap-style evening gowns",
          "High-waisted wide-leg pants with tucked-in blouses",
          "Mermaid-style cocktail dresses",
        ],
        bodyTypeSpecific: [
          "High-waisted skinny jeans (accentuate waist)",
          "Wrap tops and dresses (highlight waist)",
          "Fitted blazers (show your silhouette)",
          "A-line skirts (balance proportions)",
          "Belted coats and jackets",
          "Bodycon dresses (show curves)",
          "High-waisted palazzo pants with fitted tops",
          "Pencil skirts with tucked-in blouses",
        ],
        denim: [
          "High-waisted skinny jeans",
          "High-waisted straight-leg jeans",
          "Dark wash bootcut jeans",
          "High-waisted wide-leg jeans with fitted tops",
        ],
        fabrics: ["Structured cotton", "Silk", "Fitted wool", "Stretch denim", "Body-hugging knits"],
        styles: ["Fitted silhouettes", "Waist-defining pieces", "Structured tailoring", "Curve-enhancing cuts"],
        colors: ["Pure White", "True Black", "Royal Navy", "Emerald Green", "Hot Pink", "Deep Purple"],
      },
      jewelryRecommendations: {
        metals: ["Sterling Silver", "White Gold", "Platinum"],
        avoid: ["Yellow Gold", "Rose Gold", "Copper"],
        avoidWithHex: [
          { name: "Yellow Gold", hex: "#FFD700" },
          { name: "Rose Gold", hex: "#E8B4B8" },
          { name: "Copper", hex: "#B87333" },
        ],
        gemstones: ["Diamonds", "Sapphires", "Emeralds", "Amethyst", "Black Onyx", "Pearls"],
        recommendations: [
          "Statement silver necklaces that draw attention to your neckline",
          "Diamond stud earrings for everyday elegance",
          "White gold watch with sleek design",
          "Platinum rings with clear or cool-toned stones",
          "Silver chain bracelets that complement your wrist",
          "Pearl necklaces for classic sophistication",
        ],
      },
      makeupRecommendations: {
        foundation: "Fair with cool pink undertones (Cool Porcelain or Cool Ivory)",
        lipColors: ["True Red", "Deep Berry", "Hot Pink", "Plum", "Classic Rose"],
        eyeshadow: ["Charcoal Gray", "Navy Blue", "Silver", "Deep Purple", "Icy Blue"],
        blush: ["Cool Pink", "Berry", "Rose"],
        eyeliner: ["Black", "Navy", "Deep Purple"],
        mascara: ["Black", "Navy Black"],
      },
    },
    {
      skinTone: "Medium warm skin with golden undertones and moderate contrast",
      undertone: "warm",
      season: "Autumn",
      bodyType: "Pear - Curvy Bottom",
      confidence: "high",
      bestColors: [
        "Rust Orange",
        "Golden Yellow",
        "Forest Green",
        "Chocolate Brown",
        "Cream",
        "Camel",
        "Burgundy",
        "Burnt Sienna",
        "Olive Green",
        "Deep Teal",
      ],
      avoidColors: [
        "Icy Blue",
        "Hot Pink",
        "Pure White",
        "Cool Gray",
        "Lavender",
        "Mint Green",
        "Silver",
        "Cool Purple",
        "Neon Colors",
        "True Black",
      ],
      colorAnalysis:
        "Your warm golden undertones are beautifully complemented by rich, earthy colors. The moderate contrast in your coloring suits muted, sophisticated tones rather than bright or icy colors. Warm colors will make your skin glow.",
      clothingRecommendations: {
        casual: [
          "Straight-leg jeans with statement tops",
          "A-line dresses that skim over hips",
          "Wide-leg palazzo pants with fitted tops",
          "Flowy blouses with skinny jeans",
          "Empire waist dresses",
        ],
        formal: [
          "A-line cocktail dresses",
          "Wide-leg pantsuits with fitted blazers",
          "Empire waist evening gowns",
          "Fit-and-flare dresses",
          "Structured blazers with flowy skirts",
        ],
        bodyTypeSpecific: [
          "Wide-leg palazzo pants (balance lower body)",
          "A-line skirts (flattering for pear shape)",
          "Bootcut jeans (balance hips)",
          "Empire waist dresses (draw attention up)",
          "Statement tops with simple bottoms",
          "Straight-leg jeans (streamline silhouette)",
          "Flowy maxi skirts",
          "Structured blazers (broaden shoulders)",
        ],
        denim: ["Bootcut jeans", "Straight-leg jeans", "Wide-leg jeans", "Dark wash flare jeans"],
        fabrics: ["Flowy chiffon", "Structured cotton", "Soft wool", "Silk blends", "Comfortable stretch"],
        styles: ["A-line silhouettes", "Empire waists", "Statement tops", "Balanced proportions"],
        colors: ["Rust Orange", "Golden Yellow", "Forest Green", "Chocolate Brown", "Cream", "Camel"],
      },
      jewelryRecommendations: {
        metals: ["Yellow Gold", "Rose Gold", "Copper", "Bronze"],
        avoid: ["Silver", "White Gold", "Platinum"],
        avoidWithHex: [
          { name: "Silver", hex: "#C0C0C0" },
          { name: "White Gold", hex: "#F5F5F5" },
          { name: "Platinum", hex: "#E5E4E2" },
        ],
        gemstones: ["Amber", "Topaz", "Garnet", "Emerald", "Tiger's Eye", "Citrine"],
        recommendations: [
          "Statement gold necklaces to draw attention upward",
          "Rose gold rings with warm-toned stones",
          "Amber statement earrings",
          "Copper cuff bracelets",
          "Gold chain necklaces in varying lengths",
          "Warm-toned gemstone pendants",
        ],
      },
      makeupRecommendations: {
        foundation: "Medium with golden undertones (Warm Honey or Golden Beige)",
        lipColors: ["Terracotta", "Warm Red", "Golden Brown", "Brick Red", "Burnt Orange"],
        eyeshadow: ["Golden Brown", "Copper", "Forest Green", "Warm Bronze", "Rust"],
        blush: ["Warm Peach", "Terracotta", "Golden Coral"],
        eyeliner: ["Brown", "Bronze", "Forest Green"],
        mascara: ["Brown", "Black-Brown"],
      },
    },
    {
      skinTone: "Light skin with neutral undertones and soft contrast",
      undertone: "neutral",
      season: "Summer",
      bodyType: "Rectangle - Skinny",
      confidence: "high",
      bestColors: [
        "Soft Pink",
        "Lavender",
        "Sky Blue",
        "Mint Green",
        "Pearl White",
        "Soft Gray",
        "Dusty Rose",
        "Powder Blue",
        "Sage Green",
        "Mauve",
      ],
      avoidColors: [
        "Orange",
        "Bright Yellow",
        "Hot Pink",
        "Pure Black",
        "Bright Red",
        "Neon Colors",
        "Golden Yellow",
        "Rust Orange",
        "Bright Green",
        "Electric Blue",
      ],
      colorAnalysis:
        "Your soft, muted coloring is enhanced by gentle, cool-toned colors with gray undertones. Bright or harsh colors will overpower your delicate features. Soft, sophisticated colors will complement your natural beauty.",
      clothingRecommendations: {
        casual: [
          "Boyfriend jeans with fitted tops",
          "Layered looks with cardigans and scarves",
          "Flowy midi dresses with belts",
          "Cropped jackets with high-waisted pants",
          "Textured sweaters with straight-leg jeans",
        ],
        formal: [
          "Sheath dresses with interesting necklines",
          "Layered blazer looks",
          "Fit-and-flare dresses",
          "Textured fabrics and patterns",
          "Belted coats and dresses",
        ],
        bodyTypeSpecific: [
          "Baggy jeans with fitted tops (create curves)",
          "Belted dresses and tops (define waist)",
          "Layered outfits (add dimension)",
          "Peplum tops (create hip curves)",
          "Cropped jackets (break up torso)",
          "High-waisted palazzo pants with crop tops",
          "A-line skirts (create curves)",
          "Textured fabrics (add visual interest)",
        ],
        denim: ["Boyfriend jeans", "Baggy jeans", "High-waisted straight-leg", "Wide-leg jeans"],
        fabrics: ["Textured knits", "Soft cotton", "Chiffon", "Linen", "Layering pieces"],
        styles: ["Layered looks", "Textured fabrics", "Belted pieces", "Curve-creating silhouettes"],
        colors: ["Soft Pink", "Lavender", "Sky Blue", "Mint Green", "Pearl White", "Soft Gray"],
      },
      jewelryRecommendations: {
        metals: ["Silver", "White Gold", "Platinum", "Rose Gold (soft tones)"],
        avoid: ["Bright Yellow Gold", "Copper", "Bronze"],
        avoidWithHex: [
          { name: "Bright Yellow Gold", hex: "#FFD700" },
          { name: "Copper", hex: "#B87333" },
          { name: "Bronze", hex: "#CD7F32" },
        ],
        gemstones: ["Pearls", "Diamonds", "Sapphires", "Amethyst", "Aquamarine", "Moonstone"],
        recommendations: [
          "Layered silver necklaces for added interest",
          "Pearl earrings in various sizes",
          "White gold rings with soft stones",
          "Delicate chain bracelets",
          "Statement pieces to add personality",
          "Soft rose gold accents",
        ],
      },
      makeupRecommendations: {
        foundation: "Light with neutral undertones (Cool Beige or Neutral Ivory)",
        lipColors: ["Rose Pink", "Berry", "Soft Coral", "Mauve", "Cool Red"],
        eyeshadow: ["Soft Brown", "Lavender", "Silver", "Cool Gray", "Soft Pink"],
        blush: ["Rose Pink", "Soft Peach", "Cool Berry"],
        eyeliner: ["Brown", "Navy", "Soft Black"],
        mascara: ["Brown-Black", "Navy"],
      },
    },
    {
      skinTone: "Deep skin with warm golden undertones and high contrast",
      undertone: "warm",
      season: "Spring",
      bodyType: "Apple - Full Figure",
      confidence: "high",
      bestColors: [
        "Bright Red",
        "Golden Yellow",
        "Emerald Green",
        "Royal Navy",
        "Coral",
        "Turquoise",
        "Bright Orange",
        "Hot Pink",
        "Purple",
        "Cream",
      ],
      avoidColors: [
        "Dusty Rose",
        "Sage Green",
        "Beige",
        "Taupe",
        "Muted Colors",
        "Washed Out Pastels",
        "Gray",
        "Brown",
        "Olive",
        "Burgundy",
      ],
      colorAnalysis:
        "Your rich, deep skin tone with warm undertones looks stunning in bright, clear colors. High contrast coloring means you can wear bold, vibrant shades that would overpower others. Avoid muted or dusty colors.",
      clothingRecommendations: {
        casual: [
          "V-neck tops with straight-leg jeans",
          "Empire waist dresses",
          "Flowy tunics with leggings",
          "Open cardigans with fitted tanks",
          "Wrap-style tops",
        ],
        formal: [
          "Empire waist evening gowns",
          "A-line dresses with interesting necklines",
          "Flowy blazers with fitted pants",
          "Wrap dresses in luxe fabrics",
          "Statement necklaces with simple dresses",
        ],
        bodyTypeSpecific: [
          "Empire waist dresses (draw attention up)",
          "V-neck and scoop neck tops (elongate torso)",
          "A-line skirts (balance proportions)",
          "Straight-leg jeans (streamline silhouette)",
          "Flowy palazzo pants with fitted tops",
          "Open blazers (don't button up)",
          "Wrap tops (create waist definition)",
          "Maxi dresses with empire waists",
        ],
        denim: ["Straight-leg jeans", "Bootcut jeans", "High-waisted wide-leg", "Dark wash skinny jeans"],
        fabrics: ["Flowy chiffon", "Silk", "Jersey knits", "Soft cotton", "Draping fabrics"],
        styles: ["Empire waists", "V-necks", "Flowy silhouettes", "Vertical lines"],
        colors: ["Bright Red", "Golden Yellow", "Emerald Green", "Royal Navy", "Coral", "Turquoise"],
      },
      jewelryRecommendations: {
        metals: ["Yellow Gold", "Rose Gold", "Copper", "Bronze"],
        avoid: ["Silver", "White Gold", "Platinum"],
        avoidWithHex: [
          { name: "Silver", hex: "#C0C0C0" },
          { name: "White Gold", hex: "#F5F5F5" },
          { name: "Platinum", hex: "#E5E4E2" },
        ],
        gemstones: ["Emerald", "Ruby", "Citrine", "Coral", "Turquoise", "Gold"],
        recommendations: [
          "Bold gold statement necklaces",
          "Large hoop earrings in gold",
          "Colorful gemstone rings",
          "Layered gold chains",
          "Statement cuff bracelets",
          "Warm-toned gemstone pendants",
        ],
      },
      makeupRecommendations: {
        foundation: "Deep with warm golden undertones (Rich Golden or Deep Honey)",
        lipColors: ["Bright Red", "Coral", "Hot Pink", "Orange Red", "Golden Brown"],
        eyeshadow: ["Golden Bronze", "Emerald Green", "Purple", "Copper", "Bright Blue"],
        blush: ["Coral", "Warm Pink", "Golden Peach"],
        eyeliner: ["Black", "Brown", "Navy", "Emerald"],
        mascara: ["Black", "Brown-Black"],
      },
    },
  ]

  const result = demoResults[Math.floor(Math.random() * demoResults.length)]

  return {
    ...result,
    bestColorsWithHex: result.bestColors.map((color) => ({
      name: color,
      hex: getColorHex(color),
    })),
    avoidColorsWithHex: result.avoidColors.map((color) => ({
      name: color,
      hex: getColorHex(color),
    })),
    clothingColorsWithHex:
      result.clothingRecommendations.colors?.map((color) => ({
        name: color,
        hex: getColorHex(color),
      })) || [],
  }
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function tryRealAPI(image: string, mimeType: string): Promise<any> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
    Here's a picture of me, do colour analysis & let me know which season I fall in. Also mention few colours according to my skin tone which look best on me.

    As a professional color analyst and style consultant, please analyze this person's photo comprehensively:

    CRITICAL FIRST CHECK:
    - If this image contains MORE THAN ONE PERSON, respond with: {"error": "group_photo", "message": "Please upload a solo photo for accurate color analysis. Group photos cannot be analyzed properly."}
    - Only proceed with analysis if there is EXACTLY ONE PERSON clearly visible in the image

    ANALYSIS REQUIREMENTS:
    1. Examine skin tone depth (fair, light, medium, tan, deep, dark)
    2. Identify undertones (warm/golden, cool/pink, neutral/olive) - this is crucial for accurate recommendations
    3. Determine seasonal color palette (Spring: warm & bright, Summer: cool & muted, Autumn: warm & muted, Winter: cool & bright)
    4. Analyze body type from visible features - be specific (Hourglass-Curvy, Pear-Curvy Bottom, Apple-Full Figure, Rectangle-Skinny, Inverted Triangle-Athletic)
    5. Consider hair color and eye color in the analysis
    6. Factor in contrast levels between skin, hair, and eyes

    IMPORTANT: If you cannot clearly determine the body type from the image (due to clothing, angle, or image quality), respond with "bodyType": "unclear - please upload a clearer full-body image for accurate body type analysis"

    SPECIFIC RECOMMENDATIONS NEEDED:
    - 10 BEST colors that will make their skin glow and look healthy (be very specific with color names)
    - 10 colors to AVOID that will wash them out or clash with their undertones (be very specific)
    - Detailed clothing recommendations including:
      * Specific garment types for their body type (palazzo pants, baggy jeans, skinny jeans, A-line skirts, pencil skirts, etc.)
      * Denim styles that flatter their figure
      * Fabric recommendations
      * Style guidelines based on body type
    - Jewelry recommendations:
      * Best metals based on undertones (gold, silver, rose gold, platinum)
      * Metals to avoid with hex color codes
      * Gemstone recommendations
      * Specific jewelry pieces that complement their features
    - Professional makeup color palette with specific shade recommendations

    Please provide extremely detailed and accurate analysis that considers both color theory and body type styling. Be specific with garment names and styling advice.

    Return the response in JSON format with the following structure:
    {
      "skinTone": "detailed description",
      "undertone": "warm/cool/neutral",
      "season": "Spring/Summer/Autumn/Winter",
      "bodyType": "specific body type with descriptor (e.g., Hourglass-Curvy) or unclear message",
      "bestColors": ["color1", "color2", ...],
      "avoidColors": ["color1", "color2", ...],
      "clothingRecommendations": {
        "casual": ["recommendation1", "recommendation2", ...],
        "formal": ["recommendation1", "recommendation2", ...],
        "bodyTypeSpecific": ["specific garment recommendations"],
        "denim": ["denim style recommendations"],
        "fabrics": ["fabric recommendations"],
        "styles": ["style guidelines"],
        "colors": ["clothing color recommendations"]
      },
      "jewelryRecommendations": {
        "metals": ["recommended metals"],
        "avoid": ["metals to avoid"],
        "avoidWithHex": [{"name": "metal name", "hex": "#hexcode"}],
        "gemstones": ["recommended gemstones"],
        "recommendations": ["specific jewelry pieces"]
      },
      "makeupRecommendations": {
        "foundation": "foundation shade recommendation",
        "lipColors": ["lip color recommendations"],
        "eyeshadow": ["eyeshadow recommendations"],
        "blush": ["blush recommendations"],
        "eyeliner": ["eyeliner recommendations"],
        "mascara": ["mascara recommendations"]
      }
    }
    `

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: mimeType,
        },
      },
    ])

    const response = await result.response
    const text = response.text()

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response")
    }

    const parsedResult = JSON.parse(jsonMatch[0])

    if (parsedResult.error === "group_photo") {
      return {
        error: "group_photo",
        message: parsedResult.message,
        isDemo: false,
      }
    }

    return {
      ...parsedResult,
      isDemo: false,
      bestColorsWithHex: parsedResult.bestColors.map((color: string) => ({
        name: color,
        hex: getColorHex(color),
      })),
      avoidColorsWithHex: parsedResult.avoidColors.map((color: string) => ({
        name: color,
        hex: getColorHex(color),
      })),
      clothingColorsWithHex:
        parsedResult.clothingRecommendations.colors?.map((color: string) => ({
          name: color,
          hex: getColorHex(color),
        })) || [],
    }
  } catch (error: any) {
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { image, mimeType } = await request.json()

    try {
      const realResult = await tryRealAPI(image, mimeType)
      return NextResponse.json(realResult)
    } catch (apiError) {
      await sleep(2000)

      const demoResult = generateDemoAnalysis()
      return NextResponse.json({ ...demoResult, isDemo: true })
    }
  } catch (error: any) {
    await sleep(2000)

    const demoResult = generateDemoAnalysis()
    return NextResponse.json({ ...demoResult, isDemo: true })
  }
}
