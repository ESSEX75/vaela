import { getServerSession, type NextAuthOptions } from 'next-auth';
import VkProvider from 'next-auth/providers/vk';
import YandexProvider from 'next-auth/providers/yandex';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { env } from '@/env';
import { prisma } from '@/server/prisma';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    VkProvider({
      clientId: env.VK_CLIENT_ID,
      clientSecret: env.VK_CLIENT_SECRET,
      profile(profile) {
        return {
          id: String(profile.response[0].id),
          name: `${profile.response[0].first_name} ${profile.response[0].last_name}`.trim(),
          email: profile.response[0].email ?? null,
          image: profile.response[0].photo_100 ?? null,
        };
      },
    }),
    YandexProvider({
      clientId: env.YANDEX_CLIENT_ID,
      clientSecret: env.YANDEX_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
