FROM denoland/deno:2.3.5

WORKDIR /app

USER deno

COPY . .

RUN deno install

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache main.tsx

CMD ["run", "--allow-net", "--allow-env", "main.tsx"]
