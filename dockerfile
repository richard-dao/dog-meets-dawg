FROM node:18

RUN npm install -g expo-cli

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx expo install react-dom react-native-web @expo/metro-runtime

EXPOSE 8081 19000 19001 19002

CMD ["npx", "expo", "start"]