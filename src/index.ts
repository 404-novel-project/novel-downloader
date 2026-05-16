(async () => {
  const { run } = await import("./bootstrap/top");
  await run();
})().catch((err) => {
  // Logger may not be initialized yet — use console directly.
  // eslint-disable-next-line no-console
  console.error("[novel-downloader] bootstrap failed", err);
});
