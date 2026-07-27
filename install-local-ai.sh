#!/data/data/com.termux/files/usr/bin/bash
set -e
pkg install -y git cmake clang make
cd "$HOME"
[ -d llama.cpp/.git ] || git clone --depth=1 https://github.com/ggml-org/llama.cpp.git
cd llama.cpp
cmake -B build -DGGML_OPENMP=OFF -DLLAMA_CURL=OFF
cmake --build build --config Release -j2 --target llama-server
mkdir -p "$HOME/models"
echo 'Plaats een klein GGUF-model als ~/models/model.gguf en start:'
echo '$HOME/llama.cpp/build/bin/llama-server -m "$HOME/models/model.gguf" -c 2048 --host 127.0.0.1 --port 8080'
