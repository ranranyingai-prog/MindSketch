export interface CardStyleOption {
  id: string;
  name: string;
  category: 'handdrawn' | 'art' | 'business' | 'creative';
  prompt: string;
  previewBg: string;
  textColor: string;
  accentColor: string;
  badgeBg: string;
  description: string;
}

export const ZHIKA_CARD_STYLES: CardStyleOption[] = [
  {
    id: '淡彩手绘风',
    name: '淡彩手绘风',
    category: 'handdrawn',
    description: '钢笔线条骨架 + 淡水彩或马克笔局部填充，高级克制留白感',
    previewBg: 'bg-[#FAF8F5]',
    textColor: 'text-[#2D2A26]',
    accentColor: '#E07A5F',
    badgeBg: 'bg-[#F2E9E1]',
    prompt: '淡彩手绘风（Pen and Ink Wash Style）。视觉特征：精细钢笔线条骨架，淡水彩或马克笔点缀填充；纯白/素描纸背景（#FDFCFA），大面积留白；配以复古贴纸、细手绘框线与极简标注。知识信息图表格式，图文并茂，视觉信息密度高。'
  },
  {
    id: '黑板粉笔风',
    name: '黑板粉笔风',
    category: 'handdrawn',
    description: '深黑板质感 + 彩色粉笔手绘线条与讲义板书',
    previewBg: 'bg-[#1E2922]',
    textColor: 'text-[#ECEFEA]',
    accentColor: '#F4A261',
    badgeBg: 'bg-[#2A382E]',
    prompt: '黑板粉笔手绘风（Chalkboard Chalk Art）。视觉特征：深绿色黑板底纹，白色与彩色粉笔质感手绘字体、手绘箭头、涂鸦框与手绘小人图示。高密度的课堂教学板书结构，条理分明，充满教学赋能感。'
  },
  {
    id: '可爱手账风',
    name: '可爱手账风',
    category: 'handdrawn',
    description: '彩色和纸胶带 + 萌系手绘插画与手写体清单',
    previewBg: 'bg-[#FFF9F2]',
    textColor: 'text-[#4A3E3D]',
    accentColor: '#F190B7',
    badgeBg: 'bg-[#FFE5EC]',
    prompt: '可爱手账插画风（Cute Journal Style）。视觉特征：米黄色手账本横线纸背景，彩色和纸胶带、波点印章、高光笔标注、萌系涂鸦小图标。手绘分割块与卡片结构，极具社交宣传亲和力。'
  },
  {
    id: '3D黏土风',
    name: '3D黏土风',
    category: 'creative',
    description: '可爱立体粘土质感 + 软萌材质卡片',
    previewBg: 'bg-[#EBF4F6]',
    textColor: 'text-[#1F363D]',
    accentColor: '#2EC4B6',
    badgeBg: 'bg-[#CBE896]',
    prompt: '3D黏土软萌风格（3D Claymorphism Art）。视觉特征：微距捏塑黏土材质、软萌圆形倒角卡片、凸起微阴影、柔软光泽。高信息浓度的结构化知识卡片图解。'
  },
  {
    id: '思维导图风',
    name: '思维导图风',
    category: 'business',
    description: '树状节点 + 手绘逻辑连线与清晰知识树',
    previewBg: 'bg-[#F4F6F9]',
    textColor: 'text-[#1A2530]',
    accentColor: '#3B82F6',
    badgeBg: 'bg-[#E0E7FF]',
    prompt: '手绘思维导图风（Hand-drawn Mind Map）。视觉特征：中心主题向四周辐射逻辑树分支，搭配小箭头、数字编号节点、手绘图标与高亮圆框。清晰传达高密度知识干货。'
  },
  {
    id: '国潮新中式',
    name: '国潮新中式',
    category: 'art',
    description: '宣纸纹理 + 朱红印章与水墨手绘框线',
    previewBg: 'bg-[#F7F4EB]',
    textColor: 'text-[#2B221E]',
    accentColor: '#C84B31',
    badgeBg: 'bg-[#EAE1D0]',
    prompt: '国潮新中式风格（Modern Chinese Ink Art）。视觉特征：沉香宣纸质感底色，水墨勾勒框线、朱砂红烫金印章、传统云纹插图。充满典雅东方韵味的高质量知识长图。'
  },
  {
    id: '复古报纸风',
    name: '复古报纸风',
    category: 'art',
    description: '泛黄报纸底纹 + 双列排版与复古木刻网格',
    previewBg: 'bg-[#F2ECE1]',
    textColor: 'text-[#1C1917]',
    accentColor: '#991B1B',
    badgeBg: 'bg-[#E5DCCB]',
    prompt: '复古报纸简报风（Vintage Newspaper Style）。视觉特征：泛黄新闻纸底纹，复古英文/中文大字报头，双列栅格排版，黑色网格线与木刻版画风格插图。'
  },
  {
    id: '火柴人风',
    name: '火柴人风',
    category: 'handdrawn',
    description: '简笔火柴人场景 + 幽默小剧场图解',
    previewBg: 'bg-[#FFFFFF]',
    textColor: 'text-[#111827]',
    accentColor: '#EF4444',
    badgeBg: 'bg-[#F3F4F6]',
    prompt: '火柴人极简插画风（Stick Figure Doodle）。视觉特征：白纸底色，黑色极简火柴人动作示意图，红色高亮对话框与步骤连线，生动有趣、通俗易懂的场景化干货图解。'
  },
  {
    id: '白板笔记风',
    name: '白板笔记风',
    category: 'business',
    description: '开会白板 + 马克笔手写示意与彩色磁贴',
    previewBg: 'bg-[#F9FAFB]',
    textColor: 'text-[#111827]',
    accentColor: '#2563EB',
    badgeBg: 'bg-[#EFF6FF]',
    prompt: '会议室白板讨论风（Whiteboard Brainstorming）。视觉特征：干净白板，蓝/黑/红三色干擦马克笔线条，彩色方形便利贴磁贴，手写体思维框架。'
  },
  {
    id: '涂鸦笔记风',
    name: '涂鸦笔记风',
    category: 'handdrawn',
    description: 'Sketchnote 视觉笔记 + 丰富图解与手绘符号',
    previewBg: 'bg-[#FFFDF7]',
    textColor: 'text-[#231F20]',
    accentColor: '#FFB703',
    badgeBg: 'bg-[#FFEEC2]',
    prompt: '视觉手绘笔记风（Sketchnote Visual Note）。视觉特征：高密度的图文混排，大量的箭头、气泡框、星号、灯泡、大字标题与小连画，全图无死角传递核心干货。'
  },
  {
    id: '水彩插画风',
    name: '水彩插画风',
    category: 'art',
    description: '柔和水彩晕染背景 + 细腻插图与文艺排版',
    previewBg: 'bg-[#F3F7F0]',
    textColor: 'text-[#2D3A29]',
    accentColor: '#588157',
    badgeBg: 'bg-[#DAD7CD]',
    prompt: '柔和水彩风（Watercolor Illustration）。视觉特征：自然晕染水彩背景，清新柔和色调，手工水彩花草与知识框线，治愈风文艺宣传图。'
  },
  {
    id: '3D卡通风',
    name: '3D卡通风',
    category: 'creative',
    description: 'C4D/Blender 立体组件 + 炫彩知识模组',
    previewBg: 'bg-[#EEF2FF]',
    textColor: 'text-[#1E1B4B]',
    accentColor: '#6366F1',
    badgeBg: 'bg-[#E0E7FF]',
    prompt: '3D Cartoon Blender render. Smooth isometric 3D knowledge infographics, vivid floating widgets, vibrant color cards, sharp lighting, clean layout.'
  },
  {
    id: '裁剪拼贴风',
    name: '裁剪拼贴风',
    category: 'creative',
    description: '报纸杂志撕纸撕边 + 撕裂感艺术排版',
    previewBg: 'bg-[#F5F5F0]',
    textColor: 'text-[#18181B]',
    accentColor: '#DC2626',
    badgeBg: 'bg-[#E4E4E7]',
    prompt: 'Paper Tear Cutout Collage Style. Torn paper edges, mixed media collage, masking tape elements, bold typography and high contrast graphics.'
  },
  {
    id: '黑金高端风',
    name: '黑金高端风',
    category: 'business',
    description: '黑钻磨砂底纹 + 奢华金边与极致专业质感',
    previewBg: 'bg-[#121212]',
    textColor: 'text-[#F3F4F6]',
    accentColor: '#D4AF37',
    badgeBg: 'bg-[#262626]',
    prompt: 'Luxury Black Gold Style. Matte black texture background, metallic gold border lines, elegant typography, high density professional infographics.'
  },
  {
    id: '教育培训风',
    name: '教育培训风',
    category: 'business',
    description: '课件讲义规整栅格 + 重点高亮醒目框',
    previewBg: 'bg-[#F0FDF4]',
    textColor: 'text-[#064E3B]',
    accentColor: '#059669',
    badgeBg: 'bg-[#D1FAE5]',
    prompt: 'Educational Slide Infographic Style. Clean structured grid, prominent key takeaways, callout boxes, checkmark icons, high readability.'
  },
  {
    id: '科普海报风',
    name: '科普海报风',
    category: 'business',
    description: '解剖图式图解 + 标注线条与数据指标',
    previewBg: 'bg-[#F0F9FF]',
    textColor: 'text-[#0C4A6E]',
    accentColor: '#0284C7',
    badgeBg: 'bg-[#E0F2FE]',
    prompt: 'Science Explainer Poster Style. Detailed component callouts, numbered index badges, step-by-step arrows, rich infographic data layout.'
  },
  {
    id: '扁平插画风',
    name: '扁平插画风',
    category: 'art',
    description: '矢量矢量几何块 + 鲜明对比色与现代排版',
    previewBg: 'bg-[#FAF5FF]',
    textColor: 'text-[#581C87]',
    accentColor: '#9333EA',
    badgeBg: 'bg-[#F3E8FF]',
    prompt: 'Flat Vector Illustration. Bold color blocks, clean geometry, vector icons, structured knowledge hierarchy.'
  },
  {
    id: '童趣蜡笔风',
    name: '童趣蜡笔风',
    category: 'handdrawn',
    description: '蜡笔笔触 + 稚拙温馨的手绘填色卡片',
    previewBg: 'bg-[#FFFBEB]',
    textColor: 'text-[#78350F]',
    accentColor: '#D97706',
    badgeBg: 'bg-[#FEF3C7]',
    prompt: 'Crayon Drawing Style. Textured crayon strokes, warm childhood doodle elements, handmade card feel.'
  },
  {
    id: '孟菲斯风',
    name: '孟菲斯风',
    category: 'creative',
    description: '几何撞色线条 + 活泼波点波浪图案',
    previewBg: 'bg-[#FFF1F2]',
    textColor: 'text-[#881337]',
    accentColor: '#E11D48',
    badgeBg: 'bg-[#FFE4E6]',
    prompt: 'Memphis Pattern Graphic Style. Geometric patterns, zig-zag lines, pastel contrast colors, lively layout.'
  },
  {
    id: '现代简约风',
    name: '现代简约风',
    category: 'business',
    description: '瑞士平版设计 + 极简网格与精致无衬线体',
    previewBg: 'bg-[#FFFFFF]',
    textColor: 'text-[#09090B]',
    accentColor: '#18181B',
    badgeBg: 'bg-[#F4F4F5]',
    prompt: 'Swiss Modern Minimalist Infographic. Clean grid, crisp typography, refined line spacing, high contrast layout.'
  },
  {
    id: '分格漫画风',
    name: '分格漫画风',
    category: 'creative',
    description: '4格/6格漫画框 + 场景对话框与动态效果线',
    previewBg: 'bg-[#FAFAFA]',
    textColor: 'text-[#18181B]',
    accentColor: '#FACC15',
    badgeBg: 'bg-[#FEF08A]',
    prompt: 'Comic Panel Grid Style. Black stroke panels, speech bubbles, action lines, storytelling format.'
  },
  {
    id: '纸雕艺术风',
    name: '纸雕艺术风',
    category: 'creative',
    description: '立体剪纸阴影 + 层次感纸质镂空叠层',
    previewBg: 'bg-[#FDF2F8]',
    textColor: 'text-[#831843]',
    accentColor: '#DB2777',
    badgeBg: 'bg-[#FCE7F3]',
    prompt: 'Layered Papercut Art. Soft depth drop shadows, paper cutouts, 3D layered knowledge card.'
  },
  {
    id: '极简黑白画',
    name: '极简黑白画',
    category: 'handdrawn',
    description: '纯黑白粗线条手绘 + 强烈排版张力',
    previewBg: 'bg-[#FFFFFF]',
    textColor: 'text-[#000000]',
    accentColor: '#000000',
    badgeBg: 'bg-[#E5E5E5]',
    prompt: 'Minimalist Line Art Sketch. Monochrome black and white, hand-drawn thick strokes, high contrast layout.'
  },
  {
    id: '黑板报风',
    name: '黑板报风',
    category: 'handdrawn',
    description: '校园黑板报排版 + 彩色艺术花边与主题插图',
    previewBg: 'bg-[#1C2826]',
    textColor: 'text-[#F7F7F7]',
    accentColor: '#FACC15',
    badgeBg: 'bg-[#2D3E3A]',
    prompt: 'Chinese School Blackboard Poster. Multi-color chalk borders, illustrated title header, dense structured modules.'
  }
];
