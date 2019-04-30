<template>
	<div>
		<Button
			@click="
				mode === 'horizontal'
					? (mode = 'vertical')
					: (mode = 'horizontal')
			"
		>
			切换模式
		</Button>
		<Button @click="highColor = !highColor"> 高亮 {{ highColor }} </Button>
		<Button @click="accordion = !accordion">
			手风琴模式 {{ accordion }}
		</Button>
		<Button
			@click="
				trigger === 'hover' ? (trigger = 'click') : (trigger = 'hover')
			"
		>
			trigger {{ trigger }}
		</Button>
		<Button @click="thumbnail = !thumbnail">
			缩略图 {{ thumbnail }}
		</Button>
		<div>
			<Menu
				:mode="mode"
				:high-color="highColor"
				:accordion="accordion"
				:trigger="trigger"
				:thumbnail="thumbnail"
				:active-name="activeName"
				:open-names="['2', '3']"
				@on-change="change"
				@on-open-change="open"
				@on-collapse="collapse"
			>
				<MenuOption name="1">
					<Icon iconname="home" thumbnail-icon />
					首页
				</MenuOption>
				<MenuSub
					v-for="(item, index) in menu"
					:key="index + ''"
					:name="index + 2"
				>
					<template #title>
						<Icon iconname="folder" thumbnail-icon />
						{{ item.title }}
					</template>
					<MenuGroup
						v-for="(innerItem, innerIndex) in item.group"
						:key="innerIndex + ''"
					>
						<template #title>{{ innerItem.title }}</template>
						<MenuOption
							v-for="(menuItem, menuIndex) in innerItem.list"
							:key="menuIndex + ''"
							:name="
								index +
									2 +
									'-' +
									(innerIndex + 1) +
									'-' +
									(menuIndex + 1)
							"
						>
							{{ menuItem }}
						</MenuOption>
					</MenuGroup>
				</MenuSub>
				<MenuSub name="4">
					<MenuOption name="4-1" />
					<MenuOption name="4-2" />
					<MenuSub name="4-3">
						<MenuOption name="4-3-1" disabled />
						<MenuOption name="4-3-2" />
						<MenuSub name="4-3-3">
							<MenuOption name="4-3-3-1" />
							<MenuOption name="4-3-3-2" />
						</MenuSub>
					</MenuSub>
					<MenuSub name="4-4" disabled>
						<MenuOption name="4-4-1" />
						<MenuOption name="4-4-2" />
					</MenuSub>
				</MenuSub>
				<MenuGroup>
					<MenuOption name="5" />
					<MenuOption name="6" />
				</MenuGroup>
			</Menu>
		</div>

		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<h4>Menu props</h4>
			<p>
				@mode
				非必传，String，模式，备选'horizontal'、'vertical'，default：'vertical'
			</p>
			<p>@high-color 非必传，Boolean，高亮模式，默认: false</p>
			<p>
				@open-names
				非必传，Array，初始化MenuSub展开项的name集合，触发展开，默认:[]<br />
			</p>
			<p>
				@active-name 非必传，[Number,
				String]，当前激活的MenuOption，默认: undefined<br />
				<span style="color: green"
					>说明：如果当前MenuOption是在未展开的MenuSub项中，则会将其所有父级MenuSub展开</span
				>
			</p>
			<p>
				@accordion
				非必传，Boolean，在'vertical'手风琴展开模式，默认：false
			</p>
			<p>
				@no-arrow
				非必传，Boolean，在'horizontal'模式下，drop是否有尖角，默认：false
			</p>
			<p>
				@trigger
				非必传，String，在'horizontal'模式下，drop的呼出事件，默认：'hover'
			</p>
			<p>@width 非必传，[String, Number]，在'vertical'宽度，默认：240</p>
			<p>@indent 非必传，[String, Number]，缩进，默认：15</p>
			<p>
				@thumbnail
				非必传，Boolean，在'vertical'模式下，缩略图模式，默认：false
			</p>
			<h4>Menu events</h4>
			<p>@on-change="change" 选择菜单（MenuOption）时触发，形参：name</p>
			<p>
				@on-open-change="open" 当 展开/收起
				子菜单时触发，形参：当前展开的 Submenu 的 name 值数组
			</p>
			<p>
				@on-collapse thumbnail模式下，展开-收起时的回调，形参：Boolean
			</p>
			<br />
			<h4>MenuSub props</h4>
			<p>@name 必传，[String, Number]，当前组件的唯一标识，默认--</p>
			<p>@disabled 非必传，Boolean，disabled，默认false</p>
			<p>@thumbnail-con 非必传，String，默认缩略图icon，默认'options'</p>
			<br />
			<h4>MenuOption props</h4>
			<p>@name 必传，[String, Number]，当前组件的唯一标识，默认--</p>
			<p>@disabled 非必传，Boolean，disabled，默认false</p>
			<p>@thumbnail-con 非必传，String，默认缩略图icon，默认'more'</p>
			<p style="color: red;">
				注意：在`thumbnail`为true的时候，需要有缩略图icon，
				所以`MenuSub`的title和`MenuOptions`，的子内容中需要有一个缩略图Icon，默认`thumbnail-con`，
				可以自定义，在slot内的元素上加`thumbnail-icon`属性，组件就会将此元素设为缩略图icon，如：
				&lt;Icon iconname="home" thumbnail-icon/&gt;
			</p>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			mode: 'vertical',
			highColor: false,
			accordion: false,
			trigger: 'hover',
			thumbnail: true,
			activeName: '',
			menu: [
				{
					title: '首页',
					group: [
						{
							title: '第一组',
							list: ['home第一项', 'home第二项']
						},
						{
							title: '第二组',
							list: ['home第一项', 'home第二项']
						}
					]
				},
				{
					title: '关于',
					group: [
						{
							title: '第一组',
							list: ['about第一项', 'about第二项']
						},
						{
							title: '第二组',
							list: ['about第一项', 'about第二项']
						}
					]
				}
			]
		}
	},
	methods: {
		change(name) {
			console.log(name)
		},
		open(obj) {
			console.log(JSON.stringify(obj))
		},
		collapse(f) {
			console.log(f)
		}
	},
	mounted() {
		setTimeout(() => {
			this.activeName = '4-3-3-1'
		})
	}
}
</script>
