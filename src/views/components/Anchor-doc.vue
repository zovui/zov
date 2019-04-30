<template>
	<div>
		<div
			style="border: 3px dashed; text-align: left; margin: 15px;padding: 15px"
		>
			<h3>参数</h3>
			<h4>Anchor props</h4>
			<p>@affix 非必传，Boolean，固定模式，default：true</p>
			<p>
				@offset-top
				非必传，Number，距离窗口顶部达到指定偏移量后触发，default：0
			</p>
			<p>
				@offset-bottom
				非必传，Number，距离窗口底部达到指定偏移量后触发，default：0
			</p>
			<p>@bounds 非必传，Number，锚点区域边界，单位：px，default：5</p>
			<p>@scroll-offset 非必传，Number，点击滚动的额外距离，default：0</p>
			<p>
				@container 非必传，String |
				HTMLElement，指定滚动的容器，default：-
			</p>
			<p>@show-ink 非必传，Boolean，是否显示小圆点，default：false</p>
			<h4>Anchor events</h4>
			<p>@on-select，点击锚点时触发，返回链接，返回值：href</p>
			<p>
				@on-change，链接改变时触发，返回新链接和旧链接，返回值：newHref,
				oldHref
			</p>
			<h4>AnchorLink props</h4>
			<p>@href，String，锚点链接，default：-</p>
			<p>@title，String，文字内容，default：-</p>
			<p>@scroll-offset，点击滚动的额外距离，default：0</p>
		</div>
		<div class="anchor-wrapper">
			<div class="link-wrapper">
				<Button @click="changeCon">修改为Window</Button>
				<Button @click="andLink">添加一个连接</Button>
				<Anchor
					:bounds="100"
					@on-change="handleChange"
					@on-select="handleSelect"
					:style="{ right: '100px' }"
					:affix="true"
					:offset-top="30"
					:scroll-offset="100"
					:container="scrollCon"
					show-ink
				>
					<AnchorLink
						v-if="(link - 1) % 30 === 0"
						v-for="link in 300"
						:key="`link${link}`"
						:href="`#title-${link}`"
						:title="`title-${link}`"
					>
						<AnchorLink
							:scroll-offset="20"
							v-if="link === 61"
							href="#title-child-69"
							title="title-child-69"
						>
							<AnchorLink
								:scroll-offset="20"
								v-if="link === 61"
								href="#title-child-70"
								title="title-child-70"
							/>
							<AnchorLink
								:scroll-offset="20"
								v-if="link === 61"
								href="#title-child-71"
								title="title-child-71"
							/>
						</AnchorLink>
					</AnchorLink>
					<AnchorLink
						:scroll-offset="200"
						href="#lishi"
						title="李氏专跳"
					/>
					<AnchorLink
						v-if="showNewLink"
						href="#new-link"
						title="这是动态添加的连接"
					/>
				</Anchor>
			</div>
			<div
				v-if="con === 'div'"
				ref="listWrapper"
				id="listWrapper"
				class="list-wrapper"
			>
				<div style="height: 100px;"></div>
				<template v-for="i in 300">
					<h1
						v-if="(i - 1) % 30 === 0"
						:key="`h1${i}`"
						:id="`title-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<h1
						v-if="i === 69"
						:key="`h1${i}`"
						:id="`title-child-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<h1
						v-if="i === 75"
						:key="`h1${i}`"
						:id="`title-child-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<p v-else :id="`title-child-${i}`" :key="`p${i}`">
						{{ `content-row-index-${i}` }}
					</p>
				</template>
				<h1 id="lishi">李氏专跳</h1>
				<p v-for="i in 100" :key="`chinese-${i}`">
					这是信息司大是大非胜多负少的{{ i }}
				</p>
				<!-- <h1 id="new-link">这是新添加的哦哦哦哦哦 哦 </h1>
            <p v-for="i in 50" :key="`new-${i}`">这是信息司大是大非胜多负少的{{i}}</p> -->
			</div>
			<div v-else>
				<template v-for="i in 300">
					<h1
						v-if="(i - 1) % 30 === 0"
						:key="`h1${i}`"
						:id="`title-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<h1
						v-if="i === 69"
						:key="`h1${i}`"
						:id="`title-child-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<h1
						v-if="i === 75"
						:key="`h1${i}`"
						:id="`title-child-${i}`"
					>
						{{ `title-${i}` }}
					</h1>
					<p v-else :id="`title-child-${i}`" :key="`p${i}`">
						{{ `content-row-index-${i}` }}
					</p>
				</template>
				<h1 id="new-link">这是新添加的哦哦哦哦哦 哦</h1>
				<p v-for="i in 50" :key="`new-${i}`">
					这是信息司大是大非胜多负少的{{ i }}
				</p>
				<h1 id="lishi">李氏专跳</h1>
				<p v-for="i in 50" :key="`chinese-${i}`">
					这是信息司大是大非胜多负少的{{ i }}
				</p>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			container: null,
			value1: '1',
			scrollCon: '',
			con: 'div',
			showNewLink: false
		}
	},
	methods: {
		changeCon() {
			this.con = 'window'
			this.scrollCon = undefined
		},
		handleChange(newHref, oldHref) {
			console.log(`${oldHref} => ${newHref}`)
		},
		handleSelect(href) {
			console.log(`select ${href}`)
		},
		andLink() {
			this.showNewLink = true
		}
	},
	mounted() {
		this.scrollCon = this.$refs.listWrapper
	}
}
</script>
<style lang="scss" scoped>
.anchor-wrapper {
	.link-wrapper {
		position: absolute;
		top: 650px;
		right: 100px;
		width: 200px;
	}
	.list-wrapper {
		height: 600px;
		overflow: auto;
	}
}
</style>
