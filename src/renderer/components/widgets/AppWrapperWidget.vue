<template>
	<div id="JSEA-wrapper">
		<header class="draggable-area">
			Oracle Summer Camp 2019	
		</header>
		<!-- @slot App Body Content -->
		<slot/>
	</div>
</template>

<script>
/**
 * @description
 * <p>Application Core DOM Wrapper</p>
 */
export default {
	name: 'AppWrapperWidget',
};
</script>

<style scoped>
header {
	background:#0E0E12;
	height:40px;
	line-height: 40px;
	color:#fff;
	text-align: center;
}
</style>
