// audioData.js
export const audioData = {
    id: 3,
    baseTitle: "Weekly Podcast: Navigating the Global Economy and Tech Trends",
    sidebar: {
        recentPosts: [
            { id: 101, title: "Grow PwD Lucknow Centre: 'सामाजिक प्रगति को देखने के लिए दिग्गजता-समावेशन को प्रोत्साहन'", date: "December 5, 2025", imageUrl: "https://daynightnews.in/wp-content/uploads/2025/12/Screenshot_2025-12-06-21-00-37-25-150x150.jpg" },
            { id: 102, title: "संगरिया ट्रेल ऑफ़ इन्सट्रक्टर में पोषा एक्ट 2013 विधायक आमंत्रण प्रशिक्षण का सफल आयोजन ।", date: "December 5, 2025", imageUrl: "https://i.pinimg.com/736x/fd/cf/de/fdcfde9d481c8b868299a3336cca0579.jpg" },
        ],
        categories: [
            { name: "Podcast", count: 22 },
            { name: "Business", count: 57 },
            { name: "Technology", count: 19 },
        ],
        popularTags: [
            "Economy", "Tech", "Finance", "Market", 
            "Investments", "Future", "Startup", "Analysis",
            "Trends", "Global"
        ]
    },
    
    audioList: [
        { 
            id: 'ep1', 
            title: "Ep. 1: The Inflation Challenge and Interest Rates Outlook", 
            thumbnail: "https://i.pinimg.com/1200x/72/ad/a5/72ada5f3fea0471c9f83f75fe6fc6c0b.jpg",
            audioUrl: "path/to/ep1_audio.mp3", 
            content: `<p>इस पहले एपिसोड में, हम वैश्विक मुद्रास्फीति (Global Inflation) के कारणों और केंद्रीय बैंकों के ब्याज दर के फैसलों पर चर्चा करते हैं।</p>`,
            tags: ["Economy", "Finance", "Inflation"],
            commentsCount: 18,
            comment: { author: "Listener 1", date: "November 26, 2024", text: "Great market breakdown!" }
        },
        { 
            id: 'ep2', 
            title: "Ep. 2: Decoding the Metaverse and Web3 Technologies", 
            thumbnail: "https://i.pinimg.com/736x/34/c8/b2/34c8b2101a2cc4dbe830dcdade55ade3.jpg",
            audioUrl: "path/to/ep2_audio.mp3",
            content: `<p>यह एपिसोड मेटावर्स (Metaverse) और वेब3 (Web3) के उदय पर एक गहन नज़र डालता है और बताता है कि वे डिजिटल अर्थव्यवस्था को कैसे बदल रहे हैं।</p>`,
            tags: ["Tech", "Metaverse", "Web3", "Future"],
            commentsCount: 32,
            comment: { author: "Tech Fan", date: "November 27, 2024", text: "Fascinating discussion!" }
        },
        { 
            id: 'ep3', 
            title: "Ep. 3: Green Energy Investments and Sustainable Future", 
            thumbnail: "https://i.pinimg.com/1200x/73/e6/03/73e60328ff5f9adfe61c44ebf075c877.jpg",
            audioUrl: "path/to/ep3_audio.mp3", 
            content: `<p>हरे ऊर्जा निवेश (Green Energy Investments) पर ध्यान केंद्रित करते हुए, हम एक टिकाऊ भविष्य (Sustainable Future) के लिए कॉर्पोरेट और सरकारी रणनीतियों का विश्लेषण करते हैं।</p>`,
            tags: ["Green", "Energy", "Investments", "Climate"],
            commentsCount: 45,
            comment: { author: "Eco Investor", date: "November 28, 2024", text: "Inspiring and insightful." }
        },
    ],
    date: "November 25, 2024",
    time: "10:00 AM",
    readTime: "30 min listen",
};