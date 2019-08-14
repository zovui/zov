import ZovSpin from './v-zov-spin'
import ZovTooltip from './v-zov-tooltip'
export default function(ctx) {
	ctx.directive('zov-spin', ZovSpin(ctx))
	ctx.directive('zov-tooltip', ZovTooltip(ctx))
}
