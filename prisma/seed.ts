import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Aura database...");

  // Clean existing data
  await prisma.postHashtag.deleteMany();
  await prisma.hashtag.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.savedPost.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();
  await prisma.story.deleteMany();
  await prisma.post.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  console.log("  ✓ Cleaned existing data");

  // Create users
  const users = await Promise.all([
    prisma.user.create({
      data: {
        username: "sarah_dev",
        displayName: "Sarah Chen",
        email: "sarah@aura.dev",
        bio: "Full-stack developer & UI enthusiast 💜 Building the future one pixel at a time. San Francisco based.",
        website: "sarahchen.dev",
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        username: "luna_design",
        displayName: "Luna Park",
        email: "luna@aura.dev",
        bio: "UI/UX designer crafting digital experiences ✨ Tokyo → Worldwide",
        website: "lunapark.design",
        isVerified: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "alex.codes",
        displayName: "Alex Rivera",
        email: "alex@aura.dev",
        bio: "Open source contributor. Rust & TypeScript. Coffee addict ☕",
        website: "alexcodes.io",
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        username: "kai.music",
        displayName: "Kai Santos",
        email: "kai@aura.dev",
        bio: "Producer & sound designer 🎧 Making beats that move souls",
        isVerified: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "maya.photo",
        displayName: "Maya Patel",
        email: "maya@aura.dev",
        bio: "Street photographer 📸 NYC based. Capturing light and shadow.",
        website: "mayapatel.co",
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        username: "neo_artist",
        displayName: "Neo",
        email: "neo@aura.dev",
        bio: "Digital artist exploring the boundary between real and surreal 🎨",
        isVerified: false,
      },
    }),
    prisma.user.create({
      data: {
        username: "zara.smith",
        displayName: "Zara Smith",
        email: "zara@aura.dev",
        bio: "Fashion designer & creative director ✂️ London",
        website: "zarasmith.co",
        isVerified: true,
      },
    }),
    prisma.user.create({
      data: {
        username: "pixel.queen",
        displayName: "Pixel Queen",
        email: "pixel@aura.dev",
        bio: "Pixel art is not dead, it's evolving 👑🎮",
        isVerified: false,
      },
    }),
  ]);

  console.log(`  ✓ Created ${users.length} users`);

  // Create follow relationships
  const [sarah, luna, alex, kai, maya, neo, zara, pixel] = users;

  const follows = [
    { followerId: sarah.id, followingId: luna.id },
    { followerId: sarah.id, followingId: alex.id },
    { followerId: sarah.id, followingId: maya.id },
    { followerId: luna.id, followingId: sarah.id },
    { followerId: luna.id, followingId: kai.id },
    { followerId: luna.id, followingId: neo.id },
    { followerId: alex.id, followingId: sarah.id },
    { followerId: alex.id, followingId: luna.id },
    { followerId: kai.id, followingId: sarah.id },
    { followerId: kai.id, followingId: luna.id },
    { followerId: kai.id, followingId: alex.id },
    { followerId: maya.id, followingId: sarah.id },
    { followerId: maya.id, followingId: zara.id },
    { followerId: neo.id, followingId: luna.id },
    { followerId: neo.id, followingId: pixel.id },
    { followerId: zara.id, followingId: maya.id },
    { followerId: zara.id, followingId: sarah.id },
    { followerId: pixel.id, followingId: neo.id },
    { followerId: pixel.id, followingId: luna.id },
  ];

  await prisma.follow.createMany({ data: follows });
  console.log(`  ✓ Created ${follows.length} follow relationships`);

  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        userId: sarah.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
        ],
        caption:
          "Building the future, one line of code at a time ✨ #coding #developer #futuristic",
        location: "San Francisco, CA",
      },
    }),
    prisma.post.create({
      data: {
        userId: luna.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=600&fit=crop",
        ],
        caption:
          "Neon dreams and pixel themes 🌙 Love exploring these new design concepts #design #ui #neonart",
        location: "Tokyo, Japan",
      },
    }),
    prisma.post.create({
      data: {
        userId: alex.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop",
        ],
        caption:
          "Retro vibes meet modern tech 🎮 The aesthetic is unmatched #retro #gaming #tech",
        location: "Austin, TX",
      },
    }),
    prisma.post.create({
      data: {
        userId: kai.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
        ],
        caption:
          "Sound waves in the mountains 🏔️ Nature is the ultimate inspiration #music #nature",
        location: "Aspen, CO",
      },
    }),
    prisma.post.create({
      data: {
        userId: maya.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=600&fit=crop",
        ],
        caption:
          "Stargazing from 10,000 feet above. The universe in perfect clarity ✨ #photography #stars #nature",
        location: "Mount Rainier, WA",
      },
    }),
    prisma.post.create({
      data: {
        userId: neo.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&h=600&fit=crop",
        ],
        caption:
          "Abstract expressionism meets digital tools. Every pixel tells a story 🎨 #art #digital #abstract",
      },
    }),
    prisma.post.create({
      data: {
        userId: zara.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=600&fit=crop",
        ],
        caption:
          "The new collection is giving everything it should 🖤 #fashion #design #style",
        location: "London, UK",
      },
    }),
    prisma.post.create({
      data: {
        userId: pixel.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=600&fit=crop",
        ],
        caption:
          "The matrix has you 💚 Exploring generative pixel art #pixelart #generative #cyberpunk",
      },
    }),
    prisma.post.create({
      data: {
        userId: sarah.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=600&fit=crop",
        ],
        caption:
          "Weekend hike to clear the mind. Sometimes you need to touch grass 🌿 #nature #hiking #wellness",
        location: "Muir Woods, CA",
      },
    }),
    prisma.post.create({
      data: {
        userId: luna.id,
        mediaUrl: [
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop",
        ],
        caption:
          "Morning light through the sakura 🌸 Spring in Tokyo never gets old #tokyo #sakura #japan",
        location: "Shinjuku Gyoen, Tokyo",
      },
    }),
  ]);

  console.log(`  ✓ Created ${posts.length} posts`);

  // Extract and link hashtags
  let hashtagCount = 0;
  for (const post of posts) {
    const caption = post.caption || "";
    const tags = caption.match(/#(\w+)/g);
    if (tags) {
      for (const tag of tags) {
        const name = tag.replace("#", "").toLowerCase();
        const hashtag = await prisma.hashtag.upsert({
          where: { name },
          create: { name },
          update: {},
        });
        await prisma.postHashtag.create({
          data: { postId: post.id, hashtagId: hashtag.id },
        });
        hashtagCount++;
      }
    }
  }
  console.log(`  ✓ Linked ${hashtagCount} hashtag associations`);

  // Create likes
  const likes = [
    { userId: luna.id, postId: posts[0].id },
    { userId: alex.id, postId: posts[0].id },
    { userId: kai.id, postId: posts[0].id },
    { userId: maya.id, postId: posts[0].id },
    { userId: neo.id, postId: posts[0].id },
    { userId: sarah.id, postId: posts[1].id },
    { userId: alex.id, postId: posts[1].id },
    { userId: kai.id, postId: posts[1].id },
    { userId: sarah.id, postId: posts[2].id },
    { userId: luna.id, postId: posts[2].id },
    { userId: maya.id, postId: posts[3].id },
    { userId: zara.id, postId: posts[4].id },
    { userId: pixel.id, postId: posts[5].id },
    { userId: luna.id, postId: posts[5].id },
    { userId: sarah.id, postId: posts[6].id },
    { userId: neo.id, postId: posts[7].id },
    { userId: luna.id, postId: posts[7].id },
    { userId: alex.id, postId: posts[8].id },
    { userId: kai.id, postId: posts[9].id },
    { userId: maya.id, postId: posts[9].id },
  ];

  await prisma.like.createMany({ data: likes });
  console.log(`  ✓ Created ${likes.length} likes`);

  // Create comments
  const comments = [
    { userId: luna.id, postId: posts[0].id, text: "This is absolutely stunning! The color palette is chef's kiss 👨‍🍳💋" },
    { userId: alex.id, postId: posts[0].id, text: "What stack are you using for this? Looks incredible 🔥" },
    { userId: kai.id, postId: posts[0].id, text: "The future is now 🚀" },
    { userId: sarah.id, postId: posts[1].id, text: "Tokyo never disappoints! Great shot 📸" },
    { userId: maya.id, postId: posts[1].id, text: "The neon reflections are gorgeous!" },
    { userId: luna.id, postId: posts[2].id, text: "Retro aesthetics are making such a comeback" },
    { userId: neo.id, postId: posts[3].id, text: "This is giving me so much creative energy 🎵" },
    { userId: sarah.id, postId: posts[4].id, text: "Maya your photography is on another level 🙌" },
    { userId: zara.id, postId: posts[4].id, text: "Absolutely breathtaking! 🌌" },
    { userId: pixel.id, postId: posts[5].id, text: "Love the color theory here" },
    { userId: maya.id, postId: posts[6].id, text: "Can't wait for this collection to drop!" },
    { userId: sarah.id, postId: posts[7].id, text: "Generative art is the future 💚" },
  ];

  await prisma.comment.createMany({ data: comments });
  console.log(`  ✓ Created ${comments.length} comments`);

  // Create stories (active ones)
  const stories = [
    { userId: sarah.id, mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop", expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000) },
    { userId: luna.id, mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=700&fit=crop", expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000) },
    { userId: alex.id, mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=700&fit=crop", expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000) },
    { userId: maya.id, mediaUrl: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=700&fit=crop", expiresAt: new Date(Date.now() + 22 * 60 * 60 * 1000) },
  ];

  await prisma.story.createMany({ data: stories });
  console.log(`  ✓ Created ${stories.length} stories`);

  // Create notifications
  const notifications = [
    { userId: sarah.id, type: "like", fromId: luna.id, postId: posts[0].id, isRead: false },
    { userId: sarah.id, type: "follow", fromId: alex.id, isRead: false },
    { userId: sarah.id, type: "comment", fromId: kai.id, postId: posts[0].id, isRead: false },
    { userId: sarah.id, type: "like", fromId: maya.id, postId: posts[0].id, isRead: true },
    { userId: sarah.id, type: "mention", fromId: neo.id, postId: posts[5].id, isRead: true },
    { userId: luna.id, type: "like", fromId: sarah.id, postId: posts[1].id, isRead: false },
    { userId: luna.id, type: "follow", fromId: kai.id, isRead: true },
    { userId: alex.id, type: "comment", fromId: luna.id, postId: posts[2].id, isRead: false },
  ];

  await prisma.notification.createMany({ data: notifications });
  console.log(`  ✓ Created ${notifications.length} notifications`);

  console.log("\n✅ Seed complete! Aura is ready to go.\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
