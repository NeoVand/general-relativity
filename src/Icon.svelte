<script>
 import {HeadphonesIcon,Mic01Icon,Cancel01Icon,PlayIcon,PauseIcon,StopIcon,ArrowRight01Icon,Settings01Icon,PreviousIcon,NextIcon,Chat01Icon,ArrowUp02Icon,BookOpen01Icon,BubbleChatAddIcon} from '@hugeicons/core-free-icons';
 let {name,size=20}=$props();
 const icons={headphones:HeadphonesIcon,mic:Mic01Icon,close:Cancel01Icon,play:PlayIcon,pause:PauseIcon,stop:StopIcon,send:ArrowRight01Icon,settings:Settings01Icon,previous:PreviousIcon,next:NextIcon,chat:Chat01Icon,up:ArrowUp02Icon,book:BookOpen01Icon,newChat:BubbleChatAddIcon};
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
 {#each icons[name]||[] as [tag,attrs],i (i)}<svelte:element this={tag} {...attrs}/>{/each}
</svg>
