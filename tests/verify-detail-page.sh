#!/bin/sh
set -eu

page="lectures/ai-practical-class-2-session-1/index.html"

if rg -q '강의 목록|전체 강의 목록|href="../../"' "$page"; then
  echo "FAIL: student detail page exposes the lecture list"
  exit 1
fi

for required in \
  "관련자료" \
  "실습 프롬프트" \
  "Claude 공식 자료" \
  "스킬 학습·라이브러리" \
  "바이브코딩 MVP 기획 프롬프트" \
  "AI 페르소나 설계 프롬프트" \
  "theme-toggle" \
  "theme.js"
do
  rg -q "$required" "$page" || {
    echo "FAIL: missing $required"
    exit 1
  }
done

rg -q -- "--accent: #c9a961" styles.css || {
  echo "FAIL: missing BBC reference gold design token"
  exit 1
}

rg -q -- "--paper: #0a0a0a" styles.css || {
  echo "FAIL: missing BBC reference dark background"
  exit 1
}

echo "PASS: student navigation and curated materials"
