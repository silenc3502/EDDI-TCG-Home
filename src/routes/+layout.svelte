<script lang="ts">
	import '../app.css';
	import NavigationBar from "../shared/NavigationBar.svelte";
</script>

<NavigationBar />

<main class="p-0">
	<slot />
</main>
