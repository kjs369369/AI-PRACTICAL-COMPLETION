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

for og_tag in \
  "og:title" \
  "og:description" \
  "og:url" \
  "og:image" \
  "og:image:width" \
  "og:image:height" \
  "twitter:card" \
  "twitter:image" \
  "rel=\"canonical\""
do
  rg -q "$og_tag" "$page" || {
    echo "FAIL: missing social metadata $og_tag"
    exit 1
  }
done

rg -q "og-ai-practical-class-2-session-1.png" "$page" || {
  echo "FAIL: missing lecture-specific social image"
  exit 1
}

rg -Fq 'ogImage: extractMetaContent(html, "og:image")' "pages/[[...path]].jsx" || {
  echo "FAIL: social image metadata is not propagated to the Next.js page"
  exit 1
}

rg -q -- "--accent: #c9a961" styles.css || {
  echo "FAIL: missing BBC reference gold design token"
  exit 1
}

rg -q -- "--paper: #0a0a0a" styles.css || {
  echo "FAIL: missing BBC reference dark background"
  exit 1
}

echo "PASS: student navigation, curated materials, and social metadata"
