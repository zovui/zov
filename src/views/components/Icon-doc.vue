<template>
	<div>
		<div class="icon-header">
			<Input
				class="icon-search"
				v-model="search"
				size="large"
				autofocus
				placeholder="请输入要搜索的iconname"
				suffix="search"
			/>
		</div>
		<h3>自定义Icon</h3>
		<ul class="icon_lists">
			<li>
				<Icon custom="ion ion-load-a" />
				<div class="name">ion-load-a</div>
			</li>
		</ul>
		<h3>默认icon</h3>
		<ul class="icon_lists">
			<li v-for="(item, index) in searchResult" :key="index">
				<Icon :iconname="item.name" />
				<div class="name">{{ item.name }}</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {
			search: '',
			iconList: [
				{
					name: 'add'
				},
				{
					name: 'albums'
				},
				{
					name: 'alarm'
				},
				{
					name: 'add-circle'
				},
				{
					name: 'add-circle-outline'
				},
				{
					name: 'alert'
				},
				{
					name: 'airplane'
				},
				{
					name: 'analytics'
				},
				{
					name: 'apps'
				},
				{
					name: 'archive'
				},
				{
					name: 'appstore'
				},
				{
					name: 'arrow-down'
				},
				{
					name: 'arrow-back'
				},
				{
					name: 'arrow-dropdown-circl'
				},
				{
					name: 'arrow-dropdown'
				},
				{
					name: 'arrow-dropleft-circl'
				},
				{
					name: 'arrow-dropleft'
				},
				{
					name: 'arrow-dropright-circ'
				},
				{
					name: 'arrow-forward'
				},
				{
					name: 'arrow-dropright'
				},
				{
					name: 'arrow-dropup-circle'
				},
				{
					name: 'arrow-dropup'
				},
				{
					name: 'arrow-round-down'
				},
				{
					name: 'arrow-round-back'
				},
				{
					name: 'arrow-round-forward'
				},
				{
					name: 'arrow-round-up'
				},
				{
					name: 'arrow-up'
				},
				{
					name: 'at'
				},
				{
					name: 'backspace'
				},
				{
					name: 'battery-charging'
				},
				{
					name: 'battery-dead'
				},
				{
					name: 'battery-full'
				},
				{
					name: 'bluetooth'
				},
				{
					name: 'body'
				},
				{
					name: 'bookmarks'
				},
				{
					name: 'book'
				},
				{
					name: 'bookmark'
				},
				{
					name: 'briefcase'
				},
				{
					name: 'browsers'
				},
				{
					name: 'brush'
				},
				{
					name: 'build'
				},
				{
					name: 'bug'
				},
				{
					name: 'calculator'
				},
				{
					name: 'calendar'
				},
				{
					name: 'call'
				},
				{
					name: 'wifi'
				},
				{
					name: 'volume-mute'
				},
				{
					name: 'wallet'
				},
				{
					name: 'volume-high'
				},
				{
					name: 'volume-off'
				},
				{
					name: 'volume-low'
				},
				{
					name: 'unlock'
				},
				{
					name: 'card'
				},
				{
					name: 'chatboxes'
				},
				{
					name: 'chatbubbles'
				},
				{
					name: 'checkbox-outline'
				},
				{
					name: 'checkbox'
				},
				{
					name: 'checkmark'
				},
				{
					name: 'checkmark-circle'
				},
				{
					name: 'checkmark-circle-out'
				},
				{
					name: 'close-circle-outline'
				},
				{
					name: 'cloud-circle'
				},
				{
					name: 'close-circle'
				},
				{
					name: 'cloud-done'
				},
				{
					name: 'clock'
				},
				{
					name: 'cloud-download'
				},
				{
					name: 'cloud'
				},
				{
					name: 'cloud-outline'
				},
				{
					name: 'cloud-upload'
				},
				{
					name: 'code-working'
				},
				{
					name: 'code'
				},
				{
					name: 'code-download'
				},
				{
					name: 'color-filter'
				},
				{
					name: 'cog'
				},
				{
					name: 'compass'
				},
				{
					name: 'color-palette'
				},
				{
					name: 'color-wand'
				},
				{
					name: 'construct'
				},
				{
					name: 'contrast'
				},
				{
					name: 'contact'
				},
				{
					name: 'contacts'
				},
				{
					name: 'contract'
				},
				{
					name: 'copy'
				},
				{
					name: 'cube'
				},
				{
					name: 'crop'
				},
				{
					name: 'create'
				},
				{
					name: 'desktop'
				},
				{
					name: 'document'
				},
				{
					name: 'done-all'
				},
				{
					name: 'download'
				},
				{
					name: 'exit'
				},
				{
					name: 'expand'
				},
				{
					name: 'eye'
				},
				{
					name: 'eye-off'
				},
				{
					name: 'fastforward'
				},
				{
					name: 'film'
				},
				{
					name: 'female'
				},
				{
					name: 'filing'
				},
				{
					name: 'flag'
				},
				{
					name: 'flame'
				},
				{
					name: 'finger-print'
				},
				{
					name: 'flash-off'
				},
				{
					name: 'flash'
				},
				{
					name: 'flashlight'
				},
				{
					name: 'flask'
				},
				{
					name: 'folder-open'
				},
				{
					name: 'folder'
				},
				{
					name: 'flower'
				},
				{
					name: 'funnel'
				},
				{
					name: 'gift'
				},
				{
					name: 'glasses'
				},
				{
					name: 'globe'
				},
				{
					name: 'grid'
				},
				{
					name: 'hand'
				},
				{
					name: 'happy'
				},
				{
					name: 'hammer'
				},
				{
					name: 'heart-dislike'
				},
				{
					name: 'headset'
				},
				{
					name: 'heart-empty'
				},
				{
					name: 'help-buoy'
				},
				{
					name: 'heart'
				},
				{
					name: 'heart-half'
				},
				{
					name: 'help-circle-outline'
				},
				{
					name: 'help-circle'
				},
				{
					name: 'help'
				},
				{
					name: 'home'
				},
				{
					name: 'hourglass'
				},
				{
					name: 'image'
				},
				{
					name: 'images'
				},
				{
					name: 'infinite'
				},
				{
					name: 'information-circle-o'
				},
				{
					name: 'information'
				},
				{
					name: 'information-circle'
				},
				{
					name: 'journal'
				},
				{
					name: 'key'
				},
				{
					name: 'keypad'
				},
				{
					name: 'laptop'
				},
				{
					name: 'list-box'
				},
				{
					name: 'list'
				},
				{
					name: 'link'
				},
				{
					name: 'locate'
				},
				{
					name: 'lock'
				},
				{
					name: 'log-out'
				},
				{
					name: 'log-in'
				},
				{
					name: 'mail-open'
				},
				{
					name: 'mail-unread'
				},
				{
					name: 'mail'
				},
				{
					name: 'male'
				},
				{
					name: 'man'
				},
				{
					name: 'map'
				},
				{
					name: 'medical'
				},
				{
					name: 'menu'
				},
				{
					name: 'mic-off'
				},
				{
					name: 'moon'
				},
				{
					name: 'mic'
				},
				{
					name: 'more'
				},
				{
					name: 'move'
				},
				{
					name: 'musical-note'
				},
				{
					name: 'navigate'
				},
				{
					name: 'musical-notes'
				},
				{
					name: 'notifications-off'
				},
				{
					name: 'notifications'
				},
				{
					name: 'nuclear'
				},
				{
					name: 'notifications-outlin'
				},
				{
					name: 'open'
				},
				{
					name: 'options'
				},
				{
					name: 'paper-plane'
				},
				{
					name: 'paper'
				},
				{
					name: 'pause'
				},
				{
					name: 'paw'
				},
				{
					name: 'people'
				},
				{
					name: 'person'
				},
				{
					name: 'person-add'
				},
				{
					name: 'phone-portrait'
				},
				{
					name: 'pie'
				},
				{
					name: 'photos'
				},
				{
					name: 'pin'
				},
				{
					name: 'play'
				},
				{
					name: 'play-circle'
				},
				{
					name: 'podium'
				},
				{
					name: 'power'
				},
				{
					name: 'pricetag'
				},
				{
					name: 'pricetags'
				},
				{
					name: 'print'
				},
				{
					name: 'pulse'
				},
				{
					name: 'qr-scanner'
				},
				{
					name: 'quote'
				},
				{
					name: 'radio-button-off'
				},
				{
					name: 'radio-button-on'
				},
				{
					name: 'radio'
				},
				{
					name: 'recording'
				},
				{
					name: 'redo'
				},
				{
					name: 'refresh-circle'
				},
				{
					name: 'refresh'
				},
				{
					name: 'remove-circle-outlin'
				},
				{
					name: 'remove-circle'
				},
				{
					name: 'remove'
				},
				{
					name: 'resize'
				},
				{
					name: 'reorder'
				},
				{
					name: 'repeat'
				},
				{
					name: 'return-left'
				},
				{
					name: 'rewind'
				},
				{
					name: 'return-right'
				},
				{
					name: 'sad'
				},
				{
					name: 'rocket'
				},
				{
					name: 'save'
				},
				{
					name: 'search'
				},
				{
					name: 'send'
				},
				{
					name: 'settings'
				},
				{
					name: 'share'
				},
				{
					name: 'shuffle'
				},
				{
					name: 'shirt'
				},
				{
					name: 'skip-backward'
				},
				{
					name: 'skip-forward'
				},
				{
					name: 'speedometer'
				},
				{
					name: 'snow'
				},
				{
					name: 'square'
				},
				{
					name: 'star-half'
				},
				{
					name: 'square-outline'
				},
				{
					name: 'star-outline'
				},
				{
					name: 'star'
				},
				{
					name: 'stats'
				},
				{
					name: 'stopwatch'
				},
				{
					name: 'swap'
				},
				{
					name: 'sunny'
				},
				{
					name: 'switch'
				},
				{
					name: 'sync'
				},
				{
					name: 'tablet-portrait'
				},
				{
					name: 'text'
				},
				{
					name: 'thumbs-down'
				},
				{
					name: 'thunderstorm'
				},
				{
					name: 'thumbs-up'
				},
				{
					name: 'today'
				},
				{
					name: 'timer'
				},
				{
					name: 'time'
				},
				{
					name: 'trash'
				},
				{
					name: 'trending-down'
				},
				{
					name: 'trending-up'
				},
				{
					name: 'undo'
				},
				//     {
				//     name: 'unlock'
				// },
				{
					name: 'videocam'
				}
			]
		}
	},
	computed: {
		searchResult() {
			if (!this.search) {
				return this.iconList
			}
			return this.iconList.filter(item => ~item.name.indexOf(this.search))
		}
	}
}
</script>

<style lang="scss">
@import url(https://cdn.bootcss.com/ionicons/2.0.1/css/ionicons.min.css);
.icon-header {
	text-align: center;
	margin-bottom: 50px;
}
.icon-search {
	&.zov-input {
		width: 280px;
	}
}
.icon_lists {
	font-size: 34px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	padding: 10px;
	> li {
		margin: 5px;
		padding: 10px;
		border: 1px solid #dedede;
		border-radius: 10px;
		text-align: center;
	}
	.name {
		font-size: 16px;
	}
}
</style>
