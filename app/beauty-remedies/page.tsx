"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Home, Leaf, Sparkles, Heart, Eye, Smile, Droplets, Coffee } from "lucide-react"
import Link from "next/link"

interface Remedy {
  title: string
  problems: string[]
  ingredients: string[]
  instructions: string
  duration: string
  frequency: string
}

interface RemedyWithCategory extends Remedy {
  category: string
}

type CategoryKey =
  | "Face Care"
  | "Tan Removal"
  | "Hair Care"
  | "Teeth Whitening"
  | "Dark Circles"
  | "Lip Care"
  | "Body Care"
  | "Acne Treatment"
  | "Health Drinks"
  | "Beauty Tips"

const remediesData: Record<CategoryKey, Remedy[]> = {
  "Face Care": [
    {
      title: "Rice Face Mask & Toner",
      problems: ["Dull Skin", "Uneven Tone", "Large Pores"],
      ingredients: ["Good Quality Rice", "Honey", "Rose Water", "Milk"],
      instructions:
        "Take good quality rice, wash it three times, and soak for 30 minutes. You can also boil the rice for shorter preparation. Blend well, then add honey and rose water. You can also add milk. For toner: soak rice overnight, filter into container, add rose water.",
      duration: "15-20 minutes",
      frequency: "2-3 times a week",
    },
    {
      title: "Herbal Face Pack",
      problems: ["Acne", "Oily Skin", "Inflammation"],
      ingredients: ["Sandalwood Powder (1 tbsp)", "Aloe Vera Gel (1 tsp)", "Rose Water"],
      instructions:
        "Mix 1 tbsp sandalwood powder, 1 tsp aloe vera gel, and rose water. Apply medium layer, leave for 15 minutes until semi-dry. Wash with cold water.",
      duration: "15 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Rice Flour Brightening Mask",
      problems: ["Dark Spots", "Dull Skin", "Uneven Texture"],
      ingredients: ["Rice Flour", "Milk", "Honey"],
      instructions:
        "Mix rice flour, milk, and honey for brightening, smoothing, and glossy skin effect. Apply evenly and leave on.",
      duration: "10 minutes",
      frequency: "2-3 times a week",
    },
    {
      title: "Aloe Vera Beetroot Glow Mask",
      problems: ["Dull Skin", "Dehydration", "Lack of Natural Glow"],
      ingredients: ["Aloe Vera", "Beetroot"],
      instructions:
        "Mix aloe vera and beetroot for natural pink glow, hydration, and soft skin. Apply evenly and leave on.",
      duration: "15-20 minutes",
      frequency: "3-4 times a week",
    },
    {
      title: "Tomato Honey Anti-Tan Pack",
      problems: ["Tan", "Dark Spots", "Uneven Skin Tone"],
      ingredients: ["Tomato Pulp", "Honey"],
      instructions:
        "Mix tomato pulp and honey to help with tanning, dark spots, and evening out skin tone. Rinse with lukewarm water.",
      duration: "15 minutes",
      frequency: "Daily",
    },
    {
      title: "Malai Haldi Aata Mask",
      problems: ["Dry Skin", "Dullness", "Rough Texture"],
      ingredients: ["Malai (Cream)", "Haldi (Turmeric)", "Aata (Flour)"],
      instructions:
        "Mix malai, haldi, and aata to create a nourishing face pack. Apply evenly and let dry before washing off.",
      duration: "20 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Milk Chia Seeds Honey Mask",
      problems: ["Aging", "Dry Skin", "Fine Lines"],
      ingredients: ["Milk", "Chia Seeds", "Honey"],
      instructions:
        "Blend milk, chia seeds, and honey before applying. This provides deep hydration and anti-aging benefits.",
      duration: "15 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Multi-Powder Face Pack",
      problems: ["Oily Skin", "Acne", "Large Pores"],
      ingredients: [
        "Rice Flour",
        "Multani Mitti",
        "Sandalwood Powder",
        "Besan",
        "Neem Powder",
        "Turmeric",
        "Rose Water/Malai/Aloe Vera",
      ],
      instructions:
        "Mix all dry powders and add rose water, malai, or aloe vera to make paste. Apply and let dry completely.",
      duration: "20-25 minutes",
      frequency: "Once a week",
    },
    {
      title: "Besan Milk Turmeric Pack",
      problems: ["Tan", "Oily Skin", "Blackheads"],
      ingredients: ["Besan", "Milk", "Turmeric", "Rice Flour", "Rose Water"],
      instructions:
        "Mix besan, milk, turmeric, rice flour, and rose water. Apply evenly and scrub off gently when dry.",
      duration: "15-20 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Turmeric Yogurt Coffee Pack",
      problems: ["Dull Skin", "Tan", "Dead Skin"],
      ingredients: ["Turmeric", "Yogurt", "Coffee"],
      instructions: "Mix turmeric, yogurt, and coffee for exfoliation and brightening. Massage gently while applying.",
      duration: "15 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Orange Peel Milk Pack",
      problems: ["Vitamin C Deficiency", "Dull Skin", "Dark Spots"],
      ingredients: ["Orange Peels", "Milk", "Rice Flour/Honey"],
      instructions:
        "Grind orange peels with milk and add rice flour or honey to make a pack. Rich in Vitamin C for glowing skin.",
      duration: "20 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Honey Turmeric Gram Flour Curd Mask",
      problems: ["Acne", "Oily Skin", "Inflammation"],
      ingredients: ["Honey", "Turmeric", "Gram Flour", "Curd"],
      instructions:
        "Mix honey, turmeric, gram flour, and curd for a complete skincare mask. Apply evenly and wash off when dry.",
      duration: "15 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Honey Rice Flour Water Scrub",
      problems: ["Dead Skin", "Rough Texture", "Dullness"],
      ingredients: ["Honey", "Rice Flour", "Water"],
      instructions:
        "Mix honey, rice flour, and water to create a gentle scrub. Massage in circular motions for exfoliation.",
      duration: "5 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Yogurt Honey Hydrating Mask",
      problems: ["Dry Skin", "Dehydration", "Tight Skin"],
      ingredients: ["Yogurt", "Honey"],
      instructions:
        "Mix yogurt and honey for deep hydration and nourishment. Leave on for maximum moisture absorption.",
      duration: "15 minutes",
      frequency: "Daily",
    },
  ],
  "Tan Removal": [
    {
      title: "Sugar Coffee Exfoliating Scrub",
      problems: ["Tan", "Dead Skin", "Rough Texture"],
      ingredients: ["Sugar (3/4 cup)", "Coffee (1/4 cup)"],
      instructions:
        "Mix 3/4 cup sugar and 1/4 cup coffee to make scrub. Apply to damp skin, massage for 5 minutes, wash with cold water.",
      duration: "5 minutes",
      frequency: "2-3 times a week",
    },
    {
      title: "Complete Tan Removal Pack",
      problems: ["Stubborn Tan", "Pigmentation", "Dark Patches"],
      ingredients: [
        "Rice Flour",
        "Turmeric",
        "Honey",
        "Coconut Oil (2-3 drops)",
        "Aloe Vera Gel",
        "Body Wash",
        "Milk",
        "Rose Water",
      ],
      instructions:
        "Mix rice flour, turmeric, honey, 2-3 drops coconut oil, aloe vera gel, bit of body wash, milk, and rose water. Apply to damp skin, massage for 5 minutes, wash with cold water.",
      duration: "15 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Roasted Turmeric Multi-Mix Pack",
      problems: ["Deep Tan", "Pigmentation", "Uneven Tone"],
      ingredients: ["Roasted Turmeric", "Honey", "Tomato Juice", "Rose Water", "Coffee", "Curd"],
      instructions:
        "Roast turmeric and mix with honey, tomato juice, rose water, coffee, or curd. Apply evenly and leave until dry.",
      duration: "20 minutes",
      frequency: "Daily",
    },
    {
      title: "Malai Atta Lemon Pack",
      problems: ["Tan", "Dry Skin", "Dark Spots"],
      ingredients: ["Malai (Cream)", "Atta (Flour)", "Lemon", "Tomato Juice", "Cucumber Juice", "Water"],
      instructions:
        "Mix malai, atta, lemon, tomato juice, cucumber juice, and water. Apply as a nourishing tan removal pack.",
      duration: "20 minutes",
      frequency: "Daily",
    },
    {
      title: "Simple Gram Flour Tan Remover",
      problems: ["Light Tan", "Oily Skin", "Blackheads"],
      ingredients: ["Gram Flour", "Turmeric", "Milk"],
      instructions:
        "Mix gram flour, turmeric, and milk. Apply evenly, let dry completely, then scrub off gently with circular motions.",
      duration: "20 minutes",
      frequency: "Daily",
    },
  ],
  "Hair Care": [
    {
      title: "Damaged Hair Repair Mask",
      problems: ["Dry Hair", "Damaged Hair", "Split Ends"],
      ingredients: ["Aloe Vera Gel", "Honey", "Coconut Oil"],
      instructions:
        "Mix aloe vera gel, honey, and coconut oil. Apply to hair from mid-length to ends, leave for 30 minutes, then wash with mild shampoo.",
      duration: "30 minutes",
      frequency: "Once a week",
    },
    {
      title: "Curd Banana Aloe Nourishing Pack",
      problems: ["Frizzy Hair", "Lack of Shine", "Dry Scalp"],
      ingredients: ["Curd", "Banana", "Aloe Vera"],
      instructions:
        "Mash banana thoroughly, mix with curd and aloe vera. Apply to hair and scalp, cover with shower cap, leave for 45 minutes.",
      duration: "45 minutes",
      frequency: "Twice a week",
    },
    {
      title: "Onion Water Hair Growth Treatment",
      problems: ["Hair Fall", "Slow Growth", "Thinning Hair"],
      ingredients: ["Onion Water"],
      instructions:
        "Extract fresh onion juice, apply to scalp with cotton pads. Massage gently in circular motions, leave for 30 minutes before washing with mild shampoo.",
      duration: "30 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Coconut Oil Smooth Hair Treatment",
      problems: ["Frizzy Hair", "Rough Texture", "Lack of Shine"],
      ingredients: ["Coconut Oil"],
      instructions:
        "Warm coconut oil slightly, apply from roots to tips. Massage scalp for 5 minutes, leave overnight or for 2 hours before washing.",
      duration: "2 hours to overnight",
      frequency: "2-3 times a week",
    },
  ],
  "Teeth Whitening": [
    {
      title: "Turmeric Salt Natural Whitener",
      problems: ["Yellow Teeth", "Stains", "Plaque"],
      ingredients: ["Turmeric", "Salt"],
      instructions:
        "Mix turmeric and salt to make a paste. Brush gently with this mixture for 2 minutes, rinse thoroughly with water.",
      duration: "2 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Baking Soda Lemon Coconut Mix",
      problems: ["Teeth Stains", "Plaque", "Bad Breath"],
      ingredients: ["Baking Soda", "Lemon Juice", "Coconut Oil"],
      instructions:
        "Mix baking soda, lemon juice, and coconut oil to form paste. Use as natural toothpaste, brush gently for 2 minutes.",
      duration: "2 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Banana Peel Whitening Paste",
      problems: ["Surface Stains", "Discoloration", "Dull Teeth"],
      ingredients: ["Banana Peel", "Salt", "Lemon Juice", "Toothpaste"],
      instructions:
        "Mash banana peel with pinch of salt, lemon juice, and regular toothpaste. Apply mixture and brush gently for 3 minutes.",
      duration: "3 minutes",
      frequency: "Daily",
    },
    {
      title: "Coconut Oil Pulling",
      problems: ["Bacteria", "Bad Breath", "Gum Health"],
      ingredients: ["Coconut Oil"],
      instructions:
        "Take 1 tablespoon coconut oil, swish in mouth for 10-15 minutes, spit out (don't swallow), rinse with warm water.",
      duration: "10-15 minutes",
      frequency: "Daily morning",
    },
  ],
  "Dark Circles": [
    {
      title: "Vaseline Overnight Treatment",
      problems: ["Dark Circles", "Puffiness", "Fine Lines"],
      ingredients: ["Vaseline"],
      instructions:
        "Apply small amount of Vaseline under eyes at night. Gently pat and massage, leave overnight for deep moisturization.",
      duration: "Overnight",
      frequency: "Daily",
    },
    {
      title: "Potato Juice Eye Treatment",
      problems: ["Dark Circles", "Eye Bags", "Puffiness"],
      ingredients: ["Fresh Potato Juice"],
      instructions:
        "Extract fresh potato juice, soak cotton pads, apply under eyes for 15 minutes. The natural bleaching helps lighten dark circles.",
      duration: "15 minutes",
      frequency: "Daily",
    },
    {
      title: "Ice Cube Therapy",
      problems: ["Puffy Eyes", "Morning Swelling", "Tired Eyes"],
      ingredients: ["Ice Cubes"],
      instructions:
        "Wrap ice cubes in soft cloth, gently press under eyes for 2-3 minutes. Helps reduce puffiness and tighten skin.",
      duration: "2-3 minutes",
      frequency: "Daily morning",
    },
    {
      title: "Coffee Aloe Eye Mask",
      problems: ["Puffy Eyes", "Dark Circles", "Tired Eyes"],
      ingredients: ["Coffee", "Aloe Vera", "Almond Oil", "Honey"],
      instructions:
        "Mix coffee powder, aloe vera gel, almond oil, and honey. Apply under eyes, leave for 20 minutes, rinse gently.",
      duration: "20 minutes",
      frequency: "3 times a week",
    },
  ],
  "Lip Care": [
    {
      title: "Coconut Oil Honey Lip Pack",
      problems: ["Dry Lips", "Chapped Lips", "Rough Texture"],
      ingredients: ["Coconut Oil (1 tsp)", "Honey"],
      instructions:
        "Mix 1 tsp coconut oil and honey. Apply generously to lips, leave for 15-20 minutes, then wipe off gently with damp cloth.",
      duration: "15-20 minutes",
      frequency: "Daily",
    },
    {
      title: "Milk Cream Turmeric Lightening Pack",
      problems: ["Dark Lips", "Pigmentation", "Uneven Color"],
      ingredients: ["Milk Cream", "Turmeric"],
      instructions:
        "Mix milk cream and pinch of turmeric. Apply to lips for 10-15 minutes to naturally lighten and even out lip color.",
      duration: "10-15 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Tomato Juice Honey Pack",
      problems: ["Dark Lips", "Dryness", "Lack of Natural Color"],
      ingredients: ["Tomato Juice", "Honey"],
      instructions:
        "Mix fresh tomato juice with honey. Apply to lips for few minutes, helps restore natural pink color.",
      duration: "5-10 minutes",
      frequency: "Daily",
    },
    {
      title: "Avocado Olive Oil Nourishing Pack",
      problems: ["Severely Dry Lips", "Cracked Lips", "Damaged Lips"],
      ingredients: ["Avocado", "Olive Oil"],
      instructions:
        "Mash ripe avocado with olive oil. Apply thick layer to lips, leave for 20 minutes for deep nourishment.",
      duration: "20 minutes",
      frequency: "2-3 times a week",
    },
    {
      title: "Beetroot Aloe Overnight Treatment",
      problems: ["Pale Lips", "Dryness", "Lack of Natural Pink"],
      ingredients: ["Beetroot Juice", "Aloe Vera Gel"],
      instructions:
        "Mix beetroot juice and aloe vera gel. Apply and leave overnight for natural pink color and deep moisturization.",
      duration: "Overnight",
      frequency: "Daily",
    },
    {
      title: "Sugar Lemon Honey Scrub",
      problems: ["Dead Skin", "Rough Lips", "Flaky Texture"],
      ingredients: ["Sugar", "Lemon", "Honey"],
      instructions:
        "Mix sugar, few drops lemon, and honey. Gently scrub lips in circular motions for 2 minutes, rinse with lukewarm water.",
      duration: "2 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Sugar Coconut Oil Vanilla Scrub",
      problems: ["Dead Skin", "Rough Texture", "Dull Lips"],
      ingredients: ["Sugar", "Coconut Oil", "Vanilla Extract"],
      instructions:
        "Mix sugar, coconut oil, and few drops vanilla extract. Scrub gently for smooth, soft lips with pleasant scent.",
      duration: "2 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Turmeric Milk Lip Pack",
      problems: ["Dark Lips", "Pigmentation", "Uneven Tone"],
      ingredients: ["Turmeric", "Milk"],
      instructions: "Mix pinch of turmeric with milk to form paste. Apply to lips, leave for 10 minutes, rinse gently.",
      duration: "10 minutes",
      frequency: "3 times a week",
    },
  ],
  "Body Care": [
    {
      title: "Complete Leg Spa Treatment",
      problems: ["Rough Feet", "Dead Skin", "Cracked Heels", "Dark Feet"],
      ingredients: [
        "Baking Soda",
        "Shampoo",
        "Sugar",
        "Honey",
        "Coconut Oil",
        "Body Wash",
        "Lemon",
        "Toothpaste",
        "Moisturizer",
      ],
      instructions:
        "1. Cut and shape nails 2. Soak legs 10 min in warm water with baking soda and shampoo 3. Scrub with sugar, honey, coconut oil, body wash 4. Exfoliate to remove dead skin 5. Apply paste of 1 tbsp baking soda, 1 tbsp lemon, toothpaste until dry 6. Moisturize",
      duration: "45 minutes",
      frequency: "Once a week",
    },
    {
      title: "Elbow & Knee Lightening Treatment",
      problems: ["Dark Elbows", "Dark Knees", "Rough Patches"],
      ingredients: ["Lemon", "Potato Juice", "Turmeric"],
      instructions:
        "Mix lemon juice and potato juice with pinch of turmeric. Apply to dark areas, massage gently, leave for 20 minutes.",
      duration: "20 minutes",
      frequency: "Daily",
    },
    {
      title: "Lemon Baking Soda Scrub",
      problems: ["Dark Patches", "Rough Skin", "Dead Skin"],
      ingredients: ["Lemon", "Baking Soda"],
      instructions:
        "Mix lemon juice with baking soda to form paste. Gently scrub on dark areas, leave for 10 minutes, rinse with lukewarm water.",
      duration: "10 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Multi-Ingredient Lightening Pack",
      problems: ["Stubborn Dark Patches", "Rough Texture", "Uneven Skin"],
      ingredients: ["Baking Soda (1 tsp)", "Lemon Juice", "Honey", "Coconut Oil"],
      instructions:
        "Mix 1 tsp baking soda, lemon juice, honey, and coconut oil. Apply to problem areas, massage gently, leave for 15 minutes.",
      duration: "15 minutes",
      frequency: "Daily",
    },
    {
      title: "Vaseline Olive Oil Treatment",
      problems: ["Very Dry Skin", "Cracked Areas", "Rough Patches"],
      ingredients: ["Vaseline (1 tsp)", "Olive Oil"],
      instructions:
        "Mix 1 tsp Vaseline with olive oil. Apply to very dry areas like elbows, knees, heels. Leave overnight for deep moisturization.",
      duration: "Overnight",
      frequency: "Daily",
    },
    {
      title: "Besan Baking Soda Rose Water Pack",
      problems: ["Dark Areas", "Oily Skin", "Uneven Tone"],
      ingredients: ["Besan (Gram Flour)", "Baking Soda", "Rose Water"],
      instructions:
        "Mix besan, baking soda with rose water to form paste. Apply to body, let dry, scrub off gently while washing.",
      duration: "20 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Coffee Sugar Honey Body Scrub",
      problems: ["Dead Skin", "Rough Texture", "Dull Skin"],
      ingredients: ["Coffee", "Sugar", "Honey", "Body Wash"],
      instructions:
        "Mix coffee, sugar, honey, and body wash. Use as exfoliating scrub all over body in shower, massage in circular motions.",
      duration: "10 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Pretty Hands Salt Coffee Milk Mask",
      problems: ["Rough Hands", "Dark Knuckles", "Dry Hands"],
      ingredients: ["Salt", "Coffee", "Milk"],
      instructions:
        "Mix salt, coffee powder, and milk. Apply to hands, massage gently for 5 minutes, leave for 10 minutes, rinse with lukewarm water.",
      duration: "15 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Coconut Oil Cardamom Rice Water Hand Mask",
      problems: ["Dry Hands", "Aging Hands", "Rough Texture"],
      ingredients: ["Coconut Oil", "Cardamom", "Rice Water"],
      instructions:
        "Mix coconut oil, cardamom powder, and rice water. Apply to hands, massage well, leave for 20 minutes for soft, fragrant hands.",
      duration: "20 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Healthy Nails Treatment",
      problems: ["Weak Nails", "Brittle Nails", "Slow Growth"],
      ingredients: ["Baking Soda", "Coconut Oil"],
      instructions:
        "Mix baking soda and coconut oil. Massage nails and cuticles with this mixture for 5 minutes daily for stronger, healthier nails.",
      duration: "5 minutes",
      frequency: "Daily",
    },
  ],
  "Acne Treatment": [
    {
      title: "Rice Water Ice Cube Treatment",
      problems: ["Acne", "Inflammation", "Oily Skin"],
      ingredients: ["Rice Water"],
      instructions:
        "Freeze rice water in ice cube trays. Rub ice cube on acne-affected areas for 2-3 minutes. Helps reduce inflammation and control oil.",
      duration: "2-3 minutes",
      frequency: "Daily",
    },
    {
      title: "Charcoal Clay Blackhead Mask",
      problems: ["Blackheads", "Clogged Pores", "Oily T-Zone"],
      ingredients: ["Charcoal Clay"],
      instructions:
        "Apply charcoal clay mask to T-zone and blackhead-prone areas. Leave until completely dry, then peel off gently to remove blackheads.",
      duration: "15-20 minutes",
      frequency: "Once a week",
    },
    {
      title: "Rice Green Tea Bumpy Chin Treatment",
      problems: ["Bumpy Chin", "Small Bumps", "Rough Texture"],
      ingredients: ["Rice", "Green Tea"],
      instructions:
        "Grind rice with cooled green tea to make paste. Apply to bumpy areas, massage gently, leave for 15 minutes.",
      duration: "15 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Bakuchiol Breakout Treatment",
      problems: ["Breakouts", "Acne", "Inflamed Skin"],
      ingredients: ["Bakuchiol"],
      instructions:
        "Apply bakuchiol serum to breakout-prone areas. This natural retinol alternative helps with acne without irritation.",
      duration: "Leave on",
      frequency: "Daily evening",
    },
  ],
  "Health Drinks": [
    {
      title: "Morning Detox Water",
      problems: ["Toxins", "Poor Digestion", "Dull Skin"],
      ingredients: ["Orange", "Carrot", "Ginger", "Lemon", "Honey"],
      instructions:
        "Mix orange juice, carrot juice, grated ginger, lemon juice, and honey. Drink first thing in morning for detoxification.",
      duration: "Drink immediately",
      frequency: "Daily morning",
    },
    {
      title: "Skin Prep Beetroot Tonic",
      problems: ["Poor Blood Circulation", "Dull Complexion", "Low Energy"],
      ingredients: ["Beetroot (4-5 slices)", "Lemon (1/2)"],
      instructions:
        "Steep 4-5 slices of beetroot and 1/2 lemon in little water overnight. Sip the infused water next morning for glowing skin.",
      duration: "Overnight steeping",
      frequency: "Daily morning",
    },
    {
      title: "Blood Boost Digestive Drink",
      problems: ["Poor Digestion", "Bloating", "Low Energy"],
      ingredients: ["Fennel Seeds (1 tsp)", "Ajwain (1/2 tsp)", "Ginger (1/2 inch)"],
      instructions:
        "Mix 1 tsp fennel seeds, 1/2 tsp ajwain, 1/2 inch grated ginger. Add to 1-2 tbsp warm water and sip for better digestion.",
      duration: "Drink warm",
      frequency: "After meals",
    },
    {
      title: "Hydration Boost Water",
      problems: ["Dehydration", "Dull Skin", "Low Energy"],
      ingredients: ["Cucumber (5 slices)", "Lemon (1/2)", "Chia Seeds (1 tsp)"],
      instructions:
        "Add 5 cucumber slices, 1/2 lemon, and 1 tsp chia seeds to 1 liter water. Let soak 30 minutes, sip throughout day.",
      duration: "30 minutes soaking",
      frequency: "Daily",
    },
    {
      title: "Complete Health Powder Drink",
      problems: ["Nutrient Deficiency", "Low Immunity", "Poor Skin Health"],
      ingredients: ["Amla", "Beetroot", "Dried Rose Petals", "Moringa", "Turmeric", "Hibiscus", "Pink Salt"],
      instructions:
        "Mix amla, beetroot, dried rose petal powder, moringa, turmeric, hibiscus powder, and pink salt. Take daily by adding to water or milk.",
      duration: "Drink immediately",
      frequency: "Daily",
    },
    {
      title: "Lemon Morning Water",
      problems: ["Poor Digestion", "Toxins", "Dull Skin"],
      ingredients: ["Lemon", "Warm Water"],
      instructions:
        "Squeeze fresh lemon into warm water. Drink every morning on empty stomach for detox and glowing skin.",
      duration: "Drink immediately",
      frequency: "Daily morning",
    },
  ],
  "Beauty Tips": [
    {
      title: "Pre-Makeup Ice Treatment",
      problems: ["Large Pores", "Oily Skin", "Makeup Not Lasting"],
      ingredients: ["Ice Cube"],
      instructions:
        "Rub ice cube all over face before applying makeup. This tightens pores and helps makeup last longer.",
      duration: "2-3 minutes",
      frequency: "Before makeup",
    },
    {
      title: "Green Tea Face Spray",
      problems: ["Dull Skin", "Dehydration", "Tired Look"],
      ingredients: ["Green Tea"],
      instructions:
        "Make green tea, let it cool completely, pour into spray bottle. Spray all over face for instant freshness and antioxidants.",
      duration: "Instant",
      frequency: "Throughout day",
    },
    {
      title: "Cucumber Face Rub",
      problems: ["Puffy Skin", "Tired Look", "Dehydration"],
      ingredients: ["Fresh Cucumber"],
      instructions:
        "Cut fresh cucumber slice and rub all over face. Provides instant cooling, hydration, and reduces puffiness.",
      duration: "2-3 minutes",
      frequency: "Daily",
    },
    {
      title: "Banana Honey Hydration Mask",
      problems: ["Dry Skin", "Dehydration", "Dull Complexion"],
      ingredients: ["Banana (1/2)", "Honey (1 tbsp)"],
      instructions: "Mash half banana and add 1 tbsp honey. Apply as hydrating mask for instant moisture and glow.",
      duration: "15 minutes",
      frequency: "2-3 times a week",
    },
    {
      title: "Maskana Date Seed Treatment",
      problems: ["Dark Spots", "Pigmentation", "Uneven Skin"],
      ingredients: ["Date Seeds", "Coconut Oil"],
      instructions:
        "Roast date seeds, grind into powder, add warm water to make paste. Mix with coconut oil, heat, cool, and apply for skin lightening.",
      duration: "20 minutes",
      frequency: "2 times a week",
    },
    {
      title: "Natural Perfume Combo",
      problems: ["Body Odor", "Lack of Natural Fragrance"],
      ingredients: ["Vaseline", "Cocoa Powder", "Vanilla"],
      instructions:
        "Mix Vaseline, cocoa powder, and vanilla extract for a natural, long-lasting perfume with chocolate-vanilla scent.",
      duration: "All day",
      frequency: "Daily",
    },
    {
      title: "Vaseline Beauty Hacks",
      problems: ["Dry Areas", "Short Lashes", "Perfume Not Lasting"],
      ingredients: ["Vaseline"],
      instructions:
        "Use Vaseline with perfume for longer lasting scent, apply to lashes for thickness and length, use on dry areas for moisture.",
      duration: "As needed",
      frequency: "Daily",
    },
    {
      title: "Natural Deodorant",
      problems: ["Body Odor", "Chemical Sensitivity", "Skin Irritation"],
      ingredients: ["Aleppo Soap"],
      instructions:
        "Use Aleppo soap as natural deodorant. It's gentle, effective, and doesn't contain harsh chemicals.",
      duration: "All day",
      frequency: "Daily",
    },
    {
      title: "Clear Skin Rice Water Cocoa Mix",
      problems: ["Dull Skin", "Uneven Tone", "Large Pores"],
      ingredients: ["Rice Water", "Cocoa Powder", "Lemon", "Cinnamon", "Moringa"],
      instructions:
        "Mix rice water and cocoa powder with lemon, cinnamon, and moringa for clear, glowing skin treatment.",
      duration: "15 minutes",
      frequency: "3 times a week",
    },
    {
      title: "Natural Scent Boiling Mix",
      problems: ["Bad Body Odor", "Lack of Natural Fragrance"],
      ingredients: ["Fenugreek Seeds", "Anise", "Cloves", "Buttercup"],
      instructions:
        "Boil fenugreek seeds, anise, and cloves, or crush buttercup to make natural fragrant syrup for body scent.",
      duration: "30 minutes boiling",
      frequency: "Weekly",
    },
  ],
}

const categories = Object.keys(remediesData) as CategoryKey[]

export default function BeautyRemediesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<"all" | CategoryKey>("all")

  const filteredRemedies = (): RemedyWithCategory[] => {
    let allRemedies: RemedyWithCategory[] = []

    if (selectedCategory === "all") {
      categories.forEach((category) => {
        remediesData[category].forEach((remedy) => {
          allRemedies.push({ ...remedy, category })
        })
      })
    } else {
      allRemedies = remediesData[selectedCategory].map((remedy) => ({
        ...remedy,
        category: selectedCategory,
      }))
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      return allRemedies.filter(
        (remedy) =>
          remedy.title.toLowerCase().includes(searchLower) ||
          remedy.problems.some((problem) => problem.toLowerCase().includes(searchLower)) ||
          remedy.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchLower)),
      )
    }

    return allRemedies
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ComponentType<{ className?: string }>> = {
      "Face Care": Sparkles,
      "Tan Removal": Leaf,
      "Hair Care": Heart,
      "Teeth Whitening": Smile,
      "Dark Circles": Eye,
      "Lip Care": Heart,
      "Body Care": Sparkles,
      "Acne Treatment": Leaf,
      "Health Drinks": Droplets,
      "Beauty Tips": Coffee,
    }
    const Icon = icons[category] || Leaf
    return <Icon className="w-4 h-4" />
  }

  const remedyResults = filteredRemedies()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Natural Beauty Remedies
                </h1>
                <p className="text-sm text-gray-600">100+ Natural Solutions from 25 Pages of Beauty Wisdom</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="flex items-center gap-2 bg-transparent hover:bg-white/50">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search remedies, problems, or ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-gray-200 focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <Tabs
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value as "all" | CategoryKey)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 xl:grid-cols-11 gap-1 bg-white/50">
              <TabsTrigger
                value="all"
                className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white"
              >
                All
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white"
                >
                  {category.replace(" Care", "").replace(" Treatment", "").replace(" Drinks", "")}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-green-600">{remedyResults.length}</span> natural remedies
          </p>
        </div>

        {/* Remedies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remedyResults.map((remedy, index) => (
            <Card
              key={`${remedy.category}-${index}`}
              className="hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/80"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(remedy.category)}
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {remedy.category}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg text-gray-800 leading-tight">{remedy.title}</CardTitle>
                <CardDescription className="flex flex-wrap gap-1">
                  {remedy.problems.map((problem, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                      {problem}
                    </Badge>
                  ))}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Ingredients:</h4>
                  <div className="flex flex-wrap gap-1">
                    {remedy.ingredients.map((ingredient, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {ingredient}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-700 mb-2">Instructions:</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{remedy.instructions}</p>
                </div>

                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                  <span>
                    <strong>Duration:</strong> {remedy.duration}
                  </span>
                  <span>
                    <strong>Use:</strong> {remedy.frequency}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {remedyResults.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No remedies found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse different categories</p>
          </div>
        )}
      </div>
    </div>
  )
}
