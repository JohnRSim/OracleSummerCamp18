<template>
	<nav id="SC-nav">
		<ul>
			<router-link v-bind:to="`/home`" tag="li" :class="{'active': activeNav === 'home'}"><i class="fas fa-home" title="home"></i></router-link>
			<router-link v-bind:to="`/profile`" tag="li" :class="{'active': activeNav === 'profile'}"><i class="fas fa-user-circle" title="profile"></i></router-link>
			<router-link v-bind:to="`/assets`" tag="li" :class="{'active': activeNav === 'assets'}"><i class="fas fa-file-archive" title="assets"></i></router-link>
			<router-link v-bind:to="`/assets2`" tag="li" :class="{'active': activeNav === 'assets2'}"><i class="fas fa-file-invoice" title="assets"></i></router-link>
			<router-link v-bind:to="`/globe`" tag="li" :class="{'active': activeNav === 'globe'}"><i class="fas fa-globe-americas" title="location"></i></router-link>
			<router-link v-bind:to="`/login`" tag="li" :class="{'active': activeNav === 'logout'}"><i class="fas fa-sign-out-alt" title="logout"></i></router-link>
		</ul>
	</nav>
</template>

<script>

/**
 * @description
 * Top Lvl Nav Items
 */
export default {
	name: 'NavWidget',
	props: {
		/**
		 * Highlights Active Nav Item ['dashboard', 'wallet', 'mine', 'settings']
		 */
		activeNav: {
			type: String,
			default: '',
		},
		/**
		 * Highlights Active Sub Nav Item {'dashboard':['overview', 'account']} {'wallet':['transfer', 'export', 'import, 'transactions']} {'mine':['mine', 'earnings]}
		 */
		activeSubNav: {
			type: String,
			default: '',
		},
	},
};
</script>

<style scoped>
#SC-headerNavWrapper {
	position: relative;
	z-index: 10;
}
.platformWeb.mobile #SC-topLvlNav li {
	/*font-size:0.6em;*/
	padding: 8px 0px;
}
.platformWeb.mobile .light #SC-topSubLvlNav li {
	/*font-size:0.5em;*/
	padding: 8px 0px;
}
.night #SC-topLvlNav li:hover,
.night #SC-topLvlNav li.active {
	background:#101219;
	color:#fff;
}

.night #SC-topLvlNav li {
	color:#3598db;
}

.light #SC-topSubLvlNav {
	background:#3598db;
    border-bottom: solid 2px #1970c7;
    position: relative;
}

.light #SC-topSubLvlNav li.active,
.light #SC-topSubLvlNav li:hover {
	color:#fff;
	background:#1970c7;
	cursor: pointer;
}
.light #SC-topSubLvlNav li {
	color:rgba(255,255,255,0.9);
}

.night #SC-topLvlNav {
    background: #20222e;
    border-bottom: solid 2px #101219;
}

.night #SC-topSubLvlNav {
	background:#101219;
    border-bottom: solid 2px #000;
}

#SC-topSubLvlNav ul {
	display:flex;
	margin:0px;
	padding:0px;
}

#SC-topSubLvlNav li {
	list-style: none;
    flex-grow: 1;
	text-align: center;
	padding:10px 0px;
	font-size:0.7em;
	text-transform:uppercase;
	letter-spacing:1px;
	transition: background 0.2s, color 0.2s;
	font-weight:800;
}

.night #SC-topSubLvlNav li {
	color:#73b6fb;
}

.night #SC-topSubLvlNav li.active,
.night #SC-topSubLvlNav li:hover {
	color:#fff;
	background:#000;
	cursor: pointer;
}
#SC-topLvlNav {
	background:#fff;
	border-bottom:solid 2px #3598db;
}

#SC-topLvlNav ul {
	margin:0px;
	padding:0px;
	display:flex;
}

#SC-topLvlNav li {
	list-style: none;
	color:#3598db;
	text-transform: uppercase;
	flex-grow:1;
	padding:8px 18px;
	cursor: pointer;
	font-weight: bold;
	font-size:0.8em;
	letter-spacing: 1px;
	text-align:center;
	transition: background 0.2s, color 0.2s;
}

#SC-topLvlNav li:hover,
#SC-topLvlNav li.active {
	background:#3598db;
	color:#fff;
}

#SC-nav {
	color:#fff;
	background: #3B3E51;
	margin:50px 10px 0px 10px;
}

#SC-nav ul {
	display:flex;
	margin:0px;
	padding:0px;
}

#SC-nav li {
	list-style:none;
	flex-grow:1;
	margin:0px 5px;
	padding:10px 0px;
	text-align: center;
	cursor: pointer;
}


#SC-nav li i {
	cursor: pointer;
}
#SC-nav li.active,
#SC-nav li:hover {
	border-bottom: solid 1px #3188C8;
	color:#3188C8;
}
</style>
