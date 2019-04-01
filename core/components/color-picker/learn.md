# 浅谈颜色

## 颜色模式

是将某种颜色表现为数字形式的模型，或者说是一种记录图像颜色的方式。分为：[RGB](https://baike.baidu.com/item/RGB)模式、CMYK模式、[HSB模式](https://baike.baidu.com/item/HSB%E6%A8%A1%E5%BC%8F)、Lab颜色模式、位图模式、灰度模式、索引颜色模式、双色调模式和多通道模式。

了解一些有关颜色的基本知识和常用的视频颜色模式，对于生成符合我们视觉感官需要的图像无疑是大有益处的。

#### 原理：

颜色的实质是一种光波。它的存在是因为有三个实体：光线、被观察的对象以及观察者。

人眼是把颜色当作由被观察对象吸收或者反射不同波长的光波形成的。例如，当在一个晴朗的日子里，我们看到阳光下的某物体呈现红色时，那是因为该物体吸收了其它波长的光，而把红色波长的光反射到我们人眼里的缘故。当然，我们人眼所能感受到的只是波长在可见光范围内的光波信号。当各种不同波长的光信号一同进入我们的眼睛的某一点时，我们的视觉器官会将它们混合起来，作为一种颜色接受下来。同样我们在对图像进行颜色处理时，也要进行颜色的混合，但我们要遵循一定的规则，即我们是在不同颜色模式下对颜色进行处理的。

## 常规接触到的颜色模式

#### GRB

光的三原色：红（R）、绿（G）、蓝（B）；颜色叠加变浅，属于加色模式。

#### CMYK

颜料三原色：C：Cyan = 青色，又称为‘天蓝色’或是‘湛蓝’M：Magenta = 品红色，又称为‘洋红色’；Y：Yellow = 黄色；K：blacK=黑色，颜色相加变深，属于减色模式。

见视屏：[rgb, cmyk的区别](https://v.vzuu.com/video/998633846815899648?autoplay=false&useMSE=)

## 计算机颜色（属于发光源）分类

> web是通过荧屏呈现颜色的，所以采用的是加色模式。

### RGB模式，根据光的三原色加色模式

#### rgb

R: red

G: green

B: blue

![img](https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=2dd5b70cbe096b63951456026d5aec21/0dd7912397dda1448aa71c91b2b7d0a20cf48662.jpg)

> 上图为rgb色域



![img](https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=ba8e566e06f431ada8df4b6b2a5fc7ca/f11f3a292df5e0fe911c3afd566034a85fdf72c1.jpg)

> 上图为：rgb最高亮度叠加。

计算机定义颜色时R、G、 B三种成分的取值范围是0-255，0表示没有[刺激量](https://baike.baidu.com/item/%E5%88%BA%E6%BF%80%E9%87%8F)，255表示刺激量达最大值。R、G、B均为255时就合成了白光，R、G、B均为0时就形成了黑色，当两色分别叠加时将得到不同的“C、M、Y”颜色。rgb的每项的值域为0-255，表示灯的亮度，0最暗，255最亮。当值变化就证明此项的颜色以此值对应的纯度参与叠加。

#### hex

十六进制颜色码。

以16进制表示rgb

rgb(255,255,255) === #FFFFFF

### HSB模式，从心理学的角度来看，颜色有三个要素：色泽(Hue)、饱和度(Saturation)和亮度(Brightness)。

### hsl

> H: Hue 色相

![img](https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=8be9615ac8ea15ce55e3e85bd7695196/3ac79f3df8dcd1003273f7fe738b4710b8122f05.jpg)

HSL的H(hue)分量，代表的是人眼所能感知的颜色范围，这些颜色分布在一个平面的色相环上，取值范围是0°到360°的圆心角，每个角度可以代表一种颜色。色相值的意义在于，我们可以在不改变光感的情况下，通过旋转色相环来改变颜色。在实际应用中，我们需要记住色相环上的六大主色，用作基本参照：360°/0°红、60°黄、120°绿、180°青、240°蓝、300°洋红，它们在色相环上按照60°圆心角的间隔排列。



> S: Saturation 饱和度

![img](https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=a7ca46f1d31b0ef478e5900cbcad3abf/08f790529822720e0ffbec257acb0a46f21fab33.jpg)

HSL的S(saturation)分量，指的是色彩的饱和度，它用0%至100%的值描述了相同色相、明度下色彩纯度的变化。数值越大，颜色中的灰色越少，颜色越鲜艳，呈现一种从灰度到纯色的变化。

> L: Lightness 明度

![img](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=97991ad0b90e7bec37d70bb34e47d25d/0e2442a7d933c8957fdb96a4d01373f083020043.jpg)

HSL的L(lightness)分量，指的是色彩的明度，作用是控制色彩的明暗变化。它同样使用了0%至100%的取值范围。数值越小，色彩越暗，越接近于黑色；数值越大，色彩越亮，越接近于白色。

> 色域可视化

![img](https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=ca073e4ffd1f3a294ec5dd9cf84cd754/0b55b319ebc4b74505fa2887c2fc1e178a821530.jpg)

### hsv（也叫做 HSB)

H: Hue 色相

S: Saturation 饱和度

V: Value 明度

各项取值范围和hsl模式一样。

> 色域可视化

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/HSV_cone.png/220px-HSV_cone.png)

> 上图为3d的hsv色域可视化
>
> HSV模型的另一种可视方法是圆锥体。在这种表示中，色相被表示为绕圆锥中心轴的角度，饱和度被表示为从圆锥的横截面的圆心到这个点的距离，明度被表示为从圆锥的横截面的圆心到顶点的距离。某些表示使用了六棱锥体。这种方法更适合在一个单一物体中展示这个HSV色彩空间；但是由于它的三维本质，它不适合在二维计算机界面中选择颜色。

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Triangulo_HSV.png/220px-Triangulo_HSV.png)

> 上图为2d平面表现hsv的色域可视化
>
> HSV模型通常用于[计算机图形应用](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E5%BD%A2%E5%AD%A6)中。在用户必须选择一个颜色应用于特定图形元素各种应用环境中，经常使用HSV [色轮](https://zh.wikipedia.org/wiki/%E8%89%B2%E8%BC%AA)。在其中，色相表示为圆环；可以使用一个独立的三角形来表示饱和度和明度。典型的，这个三角形的垂直轴指示饱和度，而水平轴表示明度。在这种方式下，选择颜色可以首先在圆环中选择色相，在从三角形中选择想要的饱和度和明度。

### hsl和hsv比较

> hsl和hsv都不采用三原色`加法原色`和`减法原色`模型，而hsv和hsl以人类更熟悉的方式封装了关于颜色的信息：“这是什么颜色？深浅如何？明暗如何？”。

这两种表示在目的上类似，但在方法上有区别。二者在数学上都是圆柱，但

HSV在概念上可以被认为是颜色的倒圆锥体（黑点在下顶点，白色在上底面圆心）。

HSL在概念上表示了一个双圆锥体和圆球体（白色在上顶点，黑色在下顶点，最大横切面的圆心是半程灰色）

![img](http://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/HSL_HSV_cylinder_color_solid_comparison.png/400px-HSL_HSV_cylinder_color_solid_comparison.png)

![HSLåHSV](http://s2.sinaimg.cn/bmiddle/0049yMmvgy6P0Y8g0sFf1&690)

当HSV表述为圆柱体时，色相沿着圆柱体的外圆周变化，饱和度沿着从横截面的圆心的距离变化，明度沿着横截面到底面和顶面的距离而变化。

这种表示可能被认为是HSV色彩空间的更精确的数学模型；但是在实际中可区分出的饱和度和色相的级别数目随着明度接近黑色而减少。此外计算机典型的用有限精度范围来存储RGB值；这约束了精度，再加上人类颜色感知的限制，使圆锥体表示在多数情况下更实用。

#### HSL和HSV色彩空间比较。

HSL类似于HSV。对于一些人，HSL更好的反映了“饱和度”和“亮度”作为两个独立参数的直觉观念，但是对于另一些人，它的饱和度定义是错误的，因为非常柔和的几乎白色的颜色在HSL可以被定义为是完全饱和的。对于HSV还是HSL更适合于人类用户界面是有争议的。

W3C的CSS3规定声称“HSL的优点是它对称于亮与暗（HSV就不是这样）…”，这意味着：

- 在HSL中，饱和度分量总是从完全饱和色变化到等价的灰色（在HSV中，在极大值V的时候，饱和度从全饱和色变化到白色，这可以被认为是反直觉的）。
- 在HSL中，亮度跨越从黑色过选择的色相到白色的完整范围（在HSV中，V分量只走一半行程，从黑到选择的色相）。

> 在软件中，通常以一个线性或圆形色相选择器和在其中为选定的色相选取饱和度和明度／亮度的一个二维区域（通常为方形或三角形）形式提供给用户基于色相的颜色模型（HSV或HSL）。通过这种表示，在HSV和HSL之间的区别就无关紧要了。

Eg: 下图是一个矩形表现hsv的例子

![img](https://www.slrlounge.com/wp-content/uploads/2016/02/Adobe-color-picker-photoshop-tool-retouching-slrlounge-kishore-sawh-7.jpg)

>  矩形面板是hsv圆柱体色域的竖切面，表示一个色相的`饱和度`和`明度`。
>
> 横向：Saturation 饱和度
>
> 纵向：Value 明度

> 侧边色相条是hsv圆柱体色域的横切面，表示色环上的不同色相。


## A: alpha（透明度）

alpha项会附加到一些常用的颜色模式中用来参与颜色的不透明计算，如果 rgba、hsla、hsva、hex8。