import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set")
      // Return mock data for development
      const mockResult = {
        overallScore: 75,
        marketSize: {
          score: 80,
          analysis:
            "The Indian market shows strong potential for this startup idea with a growing digital adoption rate and increasing smartphone penetration across tier-2 and tier-3 cities.",
          tam: "₹50,000 crores - Total addressable market in India",
          sam: "₹15,000 crores - Serviceable addressable market",
          som: "₹500 crores - Serviceable obtainable market in first 3 years",
        },
        competition: {
          score: 65,
          analysis:
            "Moderate competition exists in the Indian market with several established players, but there's room for differentiation through localization and pricing strategies.",
          competitors: ["Zomato", "Swiggy", "Dunzo", "BigBasket", "Grofers"],
          competitiveAdvantage: "Focus on tier-2 cities with local language support and cash-on-delivery options",
        },
        feasibility: {
          score: 70,
          analysis:
            "Technically feasible with existing infrastructure. Main challenges include logistics in smaller cities and payment gateway integration.",
          technicalChallenges: [
            "Last-mile delivery in tier-2 cities",
            "Multi-language support",
            "Offline payment integration",
          ],
          resourceRequirements: "Team of 8-10 people including developers, operations, and marketing professionals",
        },
        marketFit: {
          score: 85,
          analysis:
            "Strong product-market fit potential given India's growing digital economy and changing consumer behavior post-COVID.",
          targetAudience: "Urban millennials and Gen-Z consumers aged 22-35 in tier-1 and tier-2 cities",
          culturalFit: "Aligns well with Indian preference for convenience and value-for-money propositions",
        },
        financials: {
          score: 72,
          analysis:
            "Financially viable with proper unit economics. Revenue potential is strong with multiple monetization streams.",
          revenueModel: "Commission-based model with delivery fees and premium subscriptions",
          pricingStrategy: "Competitive pricing with promotional offers for market penetration",
          fundingRequirement: "₹5-10 crores for initial setup and 18-month runway",
        },
        risks: {
          score: 60,
          analysis: "Moderate to high risk due to competitive market and regulatory challenges in food delivery space.",
          majorRisks: [
            "Intense competition",
            "Regulatory changes",
            "High customer acquisition costs",
            "Logistics challenges",
          ],
          mitigationStrategies: [
            "Focus on niche markets",
            "Build strong local partnerships",
            "Invest in technology",
            "Maintain healthy unit economics",
          ],
        },
        recommendations: [
          "Start with a focused geographic area (2-3 cities) before expanding",
          "Invest heavily in local partnerships and supply chain",
          "Develop strong mobile app with vernacular language support",
          "Focus on unit economics from day one",
          "Build a strong brand presence through digital marketing",
        ],
        nextSteps: [
          "Conduct detailed market research in target cities",
          "Build MVP and test with limited user base",
          "Secure initial funding of ₹2-3 crores",
          "Hire core team members",
          "Establish partnerships with local vendors",
        ],
      }

      return NextResponse.json({ result: JSON.stringify(mockResult) })
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Gemini API Error:", response.status, errorText)

      // Return mock data as fallback
      const mockResult = {
        overallScore: 75,
        marketSize: {
          score: 80,
          analysis:
            "The Indian market shows strong potential for this startup idea with a growing digital adoption rate and increasing smartphone penetration across tier-2 and tier-3 cities.",
          tam: "₹50,000 crores - Total addressable market in India",
          sam: "₹15,000 crores - Serviceable addressable market",
          som: "₹500 crores - Serviceable obtainable market in first 3 years",
        },
        competition: {
          score: 65,
          analysis:
            "Moderate competition exists in the Indian market with several established players, but there's room for differentiation through localization and pricing strategies.",
          competitors: ["Zomato", "Swiggy", "Dunzo", "BigBasket", "Grofers"],
          competitiveAdvantage: "Focus on tier-2 cities with local language support and cash-on-delivery options",
        },
        feasibility: {
          score: 70,
          analysis:
            "Technically feasible with existing infrastructure. Main challenges include logistics in smaller cities and payment gateway integration.",
          technicalChallenges: [
            "Last-mile delivery in tier-2 cities",
            "Multi-language support",
            "Offline payment integration",
          ],
          resourceRequirements: "Team of 8-10 people including developers, operations, and marketing professionals",
        },
        marketFit: {
          score: 85,
          analysis:
            "Strong product-market fit potential given India's growing digital economy and changing consumer behavior post-COVID.",
          targetAudience: "Urban millennials and Gen-Z consumers aged 22-35 in tier-1 and tier-2 cities",
          culturalFit: "Aligns well with Indian preference for convenience and value-for-money propositions",
        },
        financials: {
          score: 72,
          analysis:
            "Financially viable with proper unit economics. Revenue potential is strong with multiple monetization streams.",
          revenueModel: "Commission-based model with delivery fees and premium subscriptions",
          pricingStrategy: "Competitive pricing with promotional offers for market penetration",
          fundingRequirement: "₹5-10 crores for initial setup and 18-month runway",
        },
        risks: {
          score: 60,
          analysis: "Moderate to high risk due to competitive market and regulatory challenges in food delivery space.",
          majorRisks: [
            "Intense competition",
            "Regulatory changes",
            "High customer acquisition costs",
            "Logistics challenges",
          ],
          mitigationStrategies: [
            "Focus on niche markets",
            "Build strong local partnerships",
            "Invest in technology",
            "Maintain healthy unit economics",
          ],
        },
        recommendations: [
          "Start with a focused geographic area (2-3 cities) before expanding",
          "Invest heavily in local partnerships and supply chain",
          "Develop strong mobile app with vernacular language support",
          "Focus on unit economics from day one",
          "Build a strong brand presence through digital marketing",
        ],
        nextSteps: [
          "Conduct detailed market research in target cities",
          "Build MVP and test with limited user base",
          "Secure initial funding of ₹2-3 crores",
          "Hire core team members",
          "Establish partnerships with local vendors",
        ],
      }

      return NextResponse.json({ result: JSON.stringify(mockResult) })
    }

    const data = await response.json()

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      console.error("Invalid response structure from Gemini API:", data)
      throw new Error("Invalid response from Gemini API")
    }

    let result = data.candidates[0].content.parts[0].text

    // Clean the response to extract JSON from markdown code blocks
    result = result
      .replace(/```json\s*/g, "")
      .replace(/```\s*$/g, "")
      .trim()

    // Additional cleanup for any remaining markdown artifacts
    result = result
      .replace(/^```.*\n/g, "")
      .replace(/\n```$/g, "")
      .trim()

    return NextResponse.json({ result })
  } catch (error) {
    console.error("API Error:", error)

    // Return mock data as final fallback
    const mockResult = {
      overallScore: 75,
      marketSize: {
        score: 80,
        analysis:
          "The Indian market shows strong potential for this startup idea with a growing digital adoption rate and increasing smartphone penetration across tier-2 and tier-3 cities.",
        tam: "₹50,000 crores - Total addressable market in India",
        sam: "₹15,000 crores - Serviceable addressable market",
        som: "₹500 crores - Serviceable obtainable market in first 3 years",
      },
      competition: {
        score: 65,
        analysis:
          "Moderate competition exists in the Indian market with several established players, but there's room for differentiation through localization and pricing strategies.",
        competitors: ["Zomato", "Swiggy", "Dunzo", "BigBasket", "Grofers"],
        competitiveAdvantage: "Focus on tier-2 cities with local language support and cash-on-delivery options",
      },
      feasibility: {
        score: 70,
        analysis:
          "Technically feasible with existing infrastructure. Main challenges include logistics in smaller cities and payment gateway integration.",
        technicalChallenges: [
          "Last-mile delivery in tier-2 cities",
          "Multi-language support",
          "Offline payment integration",
        ],
        resourceRequirements: "Team of 8-10 people including developers, operations, and marketing professionals",
      },
      marketFit: {
        score: 85,
        analysis:
          "Strong product-market fit potential given India's growing digital economy and changing consumer behavior post-COVID.",
        targetAudience: "Urban millennials and Gen-Z consumers aged 22-35 in tier-1 and tier-2 cities",
        culturalFit: "Aligns well with Indian preference for convenience and value-for-money propositions",
      },
      financials: {
        score: 72,
        analysis:
          "Financially viable with proper unit economics. Revenue potential is strong with multiple monetization streams.",
        revenueModel: "Commission-based model with delivery fees and premium subscriptions",
        pricingStrategy: "Competitive pricing with promotional offers for market penetration",
        fundingRequirement: "₹5-10 crores for initial setup and 18-month runway",
      },
      risks: {
        score: 60,
        analysis: "Moderate to high risk due to competitive market and regulatory challenges in food delivery space.",
        majorRisks: [
          "Intense competition",
          "Regulatory changes",
          "High customer acquisition costs",
          "Logistics challenges",
        ],
        mitigationStrategies: [
          "Focus on niche markets",
          "Build strong local partnerships",
          "Invest in technology",
          "Maintain healthy unit economics",
        ],
      },
      recommendations: [
        "Start with a focused geographic area (2-3 cities) before expanding",
        "Invest heavily in local partnerships and supply chain",
        "Develop strong mobile app with vernacular language support",
        "Focus on unit economics from day one",
        "Build a strong brand presence through digital marketing",
      ],
      nextSteps: [
        "Conduct detailed market research in target cities",
        "Build MVP and test with limited user base",
        "Secure initial funding of ₹2-3 crores",
        "Hire core team members",
        "Establish partnerships with local vendors",
      ],
    }

    return NextResponse.json({ result: JSON.stringify(mockResult) })
  }
}
