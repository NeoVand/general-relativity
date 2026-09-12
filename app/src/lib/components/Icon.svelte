<script lang="ts">
  import {
    HeadphonesIcon,
    Mic01Icon,
    MicOff01Icon,
    Cancel01Icon,
    PlayIcon,
    PauseIcon,
    StopIcon,
    ArrowRight01Icon,
    ArrowLeft01Icon,
    Settings01Icon,
    Chat01Icon,
    ArrowUp02Icon,
    BookOpen01Icon,
    SidebarLeftIcon,
    Search01Icon,
    TextFontIcon,
    Moon02Icon,
    Sun03Icon,
    BlackHoleIcon,
    RulerIcon,
    Cone01Icon,
    FunctionIcon,
    GalaxyIcon,
    Layers01Icon,
    Notebook01Icon,
    CubeIcon,
    Route01Icon,
    InformationCircleIcon,
    ArrowDown01Icon,
    ClosedCaptionIcon,
    RefreshIcon,
    Tick02Icon,
    Maximize01Icon,
    Github01Icon,
    Menu01Icon
  } from '@hugeicons/core-free-icons';
  let { name, size = 20 }: { name: string; size?: number } = $props();
  const icons = {
    headphones: HeadphonesIcon,
    mic: Mic01Icon,
    micOff: MicOff01Icon,
    close: Cancel01Icon,
    play: PlayIcon,
    pause: PauseIcon,
    stop: StopIcon,
    arrow: ArrowRight01Icon,
    back: ArrowLeft01Icon,
    forward: ArrowRight01Icon,
    settings: Settings01Icon,
    chat: Chat01Icon,
    send: ArrowUp02Icon,
    book: BookOpen01Icon,
    sidebar: SidebarLeftIcon,
    search: Search01Icon,
    type: TextFontIcon,
    moon: Moon02Icon,
    sun: Sun03Icon,
    home: BlackHoleIcon,
    ruler: RulerIcon,
    geometry: Cone01Icon,
    function: FunctionIcon,
    galaxy: GalaxyIcon,
    layers: Layers01Icon,
    notebook: Notebook01Icon,
    cube: CubeIcon,
    route: Route01Icon,
    info: InformationCircleIcon,
    chevron: ArrowDown01Icon,
    captions: ClosedCaptionIcon,
    retry: RefreshIcon,
    check: Tick02Icon,
    expand: Maximize01Icon,
    github: Github01Icon,
    menu: Menu01Icon
  };
  const glyph = $derived(icons[name as keyof typeof icons] || BookOpen01Icon);
  const attributes = (attrs: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(attrs)
        .filter(([key]) => key !== 'key')
        .map(([key, value]) => [
          key.replace(/[A-Z]/g, (letter) => '-' + letter.toLowerCase()),
          value
        ])
    );
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
  {#each glyph as [tag, attrs], i (i)}<svelte:element this={tag} {...attributes(attrs)} />{/each}
</svg>
