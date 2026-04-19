const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const quotes = [
    // Mindfulness
    { text: "The present moment is the only moment available to us.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Breathe deeply and arrive in the present moment.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Wherever you are, be there totally.", author: "Eckhart Tolle", category: "mindfulness" },
    { text: "The mind is everything. What you think you become.", author: "Buddha", category: "mindfulness" },
    { text: "In today's rush we all think too much, seek too much, want too much.", author: "Eckhart Tolle", category: "mindfulness" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha", category: "mindfulness" },
    { text: "Mindfulness is a way of befriending ourselves and our experience.", author: "Jon Kabat-Zinn", category: "mindfulness" },
    { text: "Awareness is the greatest agent for change.", author: "Eckhart Tolle", category: "mindfulness" },
    { text: "The best way to capture moments is to pay attention.", author: "Jon Kabat-Zinn", category: "mindfulness" },
    { text: "Life is available only in the present moment.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Peace is the result of retraining your mind to process life as it is.", author: "Wayne Dyer", category: "mindfulness" },
    { text: "Silence is not an absence but a presence.", author: "Anne D. LeClaire", category: "mindfulness" },
    { text: "The little things? The little moments? They aren't little.", author: "Jon Kabat-Zinn", category: "mindfulness" },
    { text: "With mindfulness, you can establish yourself in the present in order to touch the wonders of life.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Look past your thoughts so you may drink the pure nectar of this moment.", author: "Rumi", category: "mindfulness" },
    { text: "To think in terms of either pessimism or optimism oversimplifies the truth.", author: "Thich Nhat Hanh", category: "mindfulness" },
    { text: "Be happy in the moment, that's enough. Each moment is all we need, not more.", author: "Mother Teresa", category: "mindfulness" },
    { text: "Nothing is worth more than this day.", author: "Johann Wolfgang von Goethe", category: "mindfulness" },
    { text: "The present moment always will have been.", author: "Eckhart Tolle", category: "mindfulness" },
    { text: "You can't stop the waves, but you can learn to surf.", author: "Jon Kabat-Zinn", category: "mindfulness" },
    { text: "When you realize there is nothing lacking, the whole world belongs to you.", author: "Lao Tzu", category: "mindfulness" },
    { text: "Simplicity, patience, compassion. These three are your greatest treasures.", author: "Lao Tzu", category: "mindfulness" },
    { text: "To a mind that is still, the whole universe surrenders.", author: "Zhuangzi", category: "mindfulness" },
    { text: "Nature does not hurry, yet everything is accomplished.", author: "Lao Tzu", category: "mindfulness" },
    { text: "Quiet the mind and the soul will speak.", author: "Ma Jaya Sati Bhagavati", category: "mindfulness" },
    { text: "Your calm mind is the ultimate weapon against your challenges.", author: "Bryant McGill", category: "mindfulness" },
    { text: "Within you, there is a stillness and a sanctuary to which you can retreat at any time.", author: "Hermann Hesse", category: "mindfulness" },
    { text: "The soul always knows what to do to heal itself. The challenge is to silence the mind.", author: "Caroline Myss", category: "mindfulness" },
    { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott", category: "mindfulness" },
    { text: "The quieter you become, the more you can hear.", author: "Ram Dass", category: "mindfulness" },
    { text: "Between stimulus and response there is a space. In that space is our power to choose.", author: "Viktor Frankl", category: "mindfulness" },
    { text: "Wherever you go, there you are.", author: "Jon Kabat-Zinn", category: "mindfulness" },
    { text: "If you want to conquer the anxiety of life, live in the moment, live in the breath.", author: "Amit Ray", category: "mindfulness" },

    // Focus
    { text: "Where focus goes, energy flows.", author: "Tony Robbins", category: "focus" },
    { text: "The key is not to prioritize what's on your schedule, but to schedule your priorities.", author: "Stephen Covey", category: "focus" },
    { text: "Concentrate all your thoughts upon the work at hand.", author: "Alexander Graham Bell", category: "focus" },
    { text: "You will never reach your destination if you stop and throw stones at every dog that barks.", author: "Winston Churchill", category: "focus" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", category: "focus" },
    { text: "The successful warrior is the average man with laser-like focus.", author: "Bruce Lee", category: "focus" },
    { text: "That's been one of my mantras — focus and simplicity.", author: "Steve Jobs", category: "focus" },
    { text: "You don't need more time, you just need to decide.", author: "Seth Godin", category: "focus" },
    { text: "One reason so few of us achieve what we truly want is that we never direct our focus.", author: "Tony Robbins", category: "focus" },
    { text: "My success, part of it certainly, is that I have focused in on a few things.", author: "Bill Gates", category: "focus" },
    { text: "Starve your distractions, feed your focus.", author: "Unknown", category: "focus" },
    { text: "Do one thing at a time, and while doing it put your whole soul into it.", author: "Swami Vivekananda", category: "focus" },
    { text: "The art of being wise is the art of knowing what to overlook.", author: "William James", category: "focus" },
    { text: "Energy flows where attention goes.", author: "James Redfield", category: "focus" },
    { text: "Your focus determines your reality.", author: "Qui-Gon Jinn", category: "focus" },
    { text: "It's not always that we need to do more but rather that we need to focus on less.", author: "Nathan W. Morris", category: "focus" },
    { text: "Lack of direction, not lack of time, is the problem.", author: "Zig Ziglar", category: "focus" },
    { text: "Deep work is the ability to focus without distraction on a cognitively demanding task.", author: "Cal Newport", category: "focus" },
    { text: "The main thing is to keep the main thing the main thing.", author: "Stephen Covey", category: "focus" },
    { text: "You can do anything, but not everything.", author: "David Allen", category: "focus" },
    { text: "Focused, hard work is the real key to success.", author: "John Carmack", category: "focus" },
    { text: "Most of what we say and do is not essential. If you can eliminate it, you'll have more time.", author: "Marcus Aurelius", category: "focus" },
    { text: "Distraction is the enemy of vision.", author: "T.D. Jakes", category: "focus" },
    { text: "When walking, walk. When eating, eat.", author: "Zen Proverb", category: "focus" },
    { text: "To do two things at once is to do neither.", author: "Publilius Syrus", category: "focus" },
    { text: "Take up one idea. Make that one idea your life.", author: "Swami Vivekananda", category: "focus" },
    { text: "The shorter way to do many things is to only do one thing at a time.", author: "Mozart", category: "focus" },
    { text: "Beware the barrenness of a busy life.", author: "Socrates", category: "focus" },
    { text: "He who chases two rabbits catches neither.", author: "Confucius", category: "focus" },
    { text: "Give whatever you are doing and whoever you are with the gift of your attention.", author: "Jim Rohn", category: "focus" },
    { text: "The first law of success is concentration.", author: "William Mathews", category: "focus" },
    { text: "If you chase two rabbits, you will not catch either one.", author: "Russian Proverb", category: "focus" },
    { text: "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.", author: "Bruce Lee", category: "focus" },

    // Wellness
    { text: "You don't have to be positive all the time. It's okay to feel what you feel.", author: "Lori Deschene", category: "wellness" },
    { text: "Rest is not idleness — it is the work of recovery.", author: "Unknown", category: "wellness" },
    { text: "Take care of your body. It's the only place you have to live.", author: "Jim Rohn", category: "wellness" },
    { text: "Self-care is not selfish. You cannot serve from an empty vessel.", author: "Eleanor Brownn", category: "wellness" },
    { text: "Almost everything will work again if you unplug it for a few minutes, including you.", author: "Anne Lamott", category: "wellness" },
    { text: "Nourishing yourself in a way that helps you blossom in the direction you want to go is attainable.", author: "Deborah Day", category: "wellness" },
    { text: "The greatest wealth is health.", author: "Virgil", category: "wellness" },
    { text: "Happiness is the highest form of health.", author: "Dalai Lama", category: "wellness" },
    { text: "Sleep is the best meditation.", author: "Dalai Lama", category: "wellness" },
    { text: "A good laugh and a long sleep are the best cures in the doctor's book.", author: "Irish Proverb", category: "wellness" },
    { text: "Your body hears everything your mind says.", author: "Naomi Judd", category: "wellness" },
    { text: "To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.", author: "Buddha", category: "wellness" },
    { text: "The time to relax is when you don't have time for it.", author: "Sydney J. Harris", category: "wellness" },
    { text: "An empty lantern provides no light. Self-care is the fuel that allows your light to shine brightly.", author: "Unknown", category: "wellness" },
    { text: "You owe yourself the love that you so freely give to other people.", author: "Unknown", category: "wellness" },
    { text: "Rest when you're weary. Refresh and renew yourself, your body, your mind, your spirit.", author: "Ralph Marston", category: "wellness" },
    { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer", category: "wellness" },
    { text: "Healing takes courage, and we all have courage, even if we have to dig a little to find it.", author: "Tori Amos", category: "wellness" },
    { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar", category: "wellness" },
    { text: "Wellness is the complete integration of body, mind, and spirit.", author: "Greg Anderson", category: "wellness" },
    { text: "Be gentle with yourself. You are a child of the universe.", author: "Max Ehrmann", category: "wellness" },
    { text: "Talk to yourself like you would to someone you love.", author: "Brené Brown", category: "wellness" },
    { text: "You are enough just as you are.", author: "Meghan Markle", category: "wellness" },
    { text: "Caring for myself is not self-indulgence, it is self-preservation.", author: "Audre Lorde", category: "wellness" },
    { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black", category: "wellness" },
    { text: "Almost everything will work again if you unplug it for a few minutes.", author: "Anne Lamott", category: "wellness" },
    { text: "You can't pour from an empty cup. Take care of yourself first.", author: "Unknown", category: "wellness" },
    { text: "Your mental health is a priority. Your happiness is an essential. Your self-care is a necessity.", author: "Unknown", category: "wellness" },
    { text: "It's okay to not be okay — as long as you are not giving up.", author: "Karen Salmansohn", category: "wellness" },
    { text: "Every day is a second chance.", author: "Unknown", category: "wellness" },
    { text: "You are allowed to be both a masterpiece and a work in progress simultaneously.", author: "Sophia Bush", category: "wellness" },
    { text: "Invest in your mind, body and soul every single day.", author: "Unknown", category: "wellness" },
    { text: "Health is not about the weight you lose, but about the life you gain.", author: "Unknown", category: "wellness" },
];

async function seed() {
    const batch = db.batch();
    quotes.forEach(quote => {
        const ref = db.collection("quotes").doc();
        batch.set(ref, quote);
    });
    await batch.commit();
    console.log(`Seeded ${quotes.length} quotes!`);
}

seed();