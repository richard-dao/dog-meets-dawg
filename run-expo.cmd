@echo off
echo Starting Expo in Docker...

docker run -it ^
  -p 8081:8081 ^
  -p 19000:19000 ^
  -p 19001:19001 ^
  -p 19002:19002 ^
  dog-meets-dawg

pause