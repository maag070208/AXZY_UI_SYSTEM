import{d as r,j as e,r as w}from"./iframe-B5RMobo9.js";const de={title:"Layout/ITStack",component:r,argTypes:{direction:{control:"select",options:["row","column","row-reverse","column-reverse"],description:"Flex direction. Default: column."},spacing:{control:{type:"range",min:0,max:16,step:1},description:"Gap between children in 0.25rem units. Default: 0."},alignItems:{control:"select",options:[void 0,"start","end","center","stretch","baseline"],description:"Cross-axis alignment."},justifyContent:{control:"select",options:[void 0,"start","end","center","between","around","evenly"],description:"Main-axis justification."},flexWrap:{control:"select",options:[void 0,"nowrap","wrap","wrap-reverse"],description:"Flex wrap behavior."},as:{control:"select",options:["div","section","nav","ul","ol","main","article","header","footer","aside","form"],description:"HTML element to render."}}},s=({children:a,className:t=""})=>e.jsx("div",{className:`bg-primary-100 text-primary-800 rounded-lg p-4 text-center font-medium ${t}`,children:a}),d={args:{direction:"column",spacing:2},render:a=>e.jsxs(r,{...a,children:[e.jsx(s,{children:"Item 1"}),e.jsx(s,{children:"Item 2"}),e.jsx(s,{children:"Item 3"})]})},o={args:{direction:"row",spacing:2},render:a=>e.jsxs(r,{...a,children:[e.jsx(s,{children:"Item 1"}),e.jsx(s,{children:"Item 2"}),e.jsx(s,{children:"Item 3"})]})},l={render:()=>e.jsx(r,{spacing:6,children:["column","row","column-reverse","row-reverse"].map(a=>e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider",children:a}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-700",children:e.jsxs(r,{direction:a,spacing:2,children:[e.jsx(s,{children:"First"}),e.jsx(s,{children:"Second"}),e.jsx(s,{children:"Third"})]})})]},a))})},i={render:()=>e.jsx(r,{spacing:4,children:[0,1,2,4,6,8,10,12].map(a=>e.jsxs("div",{children:[e.jsxs("p",{className:"text-xs font-semibold text-slate-400 mb-1.5",children:["spacing=",a," — ",a*.25,"rem"]}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4",children:e.jsxs(r,{direction:"row",spacing:a,children:[e.jsx(s,{children:"Item 1"}),e.jsx(s,{children:"Item 2"}),e.jsx(s,{children:"Item 3"})]})})]},a))})},c={render:()=>e.jsx(r,{spacing:2,children:["start","center","end","between","around","evenly"].map(a=>e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold text-slate-400 mb-1.5",children:a}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4",children:e.jsxs(r,{direction:"row",spacing:2,justifyContent:a,className:"w-full",children:[e.jsx("div",{className:"w-10 h-10 rounded-lg bg-primary-400/60"}),e.jsx("div",{className:"w-10 h-10 rounded-lg bg-cyan-400/60"}),e.jsx("div",{className:"w-10 h-10 rounded-lg bg-violet-400/60"})]})})]},a))})},m={render:()=>e.jsx(r,{spacing:2,children:["start","center","end","stretch","baseline"].map(a=>e.jsxs("div",{children:[e.jsx("p",{className:"text-xs font-semibold text-slate-400 mb-1.5",children:a}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4",children:e.jsxs(r,{direction:"row",spacing:2,alignItems:a,className:"h-20 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg",children:[e.jsx("div",{className:"w-10 h-6 rounded bg-primary-400/60"}),e.jsx("div",{className:"w-10 h-12 rounded bg-cyan-400/60"}),e.jsx("div",{className:"w-10 h-8 rounded bg-violet-400/60"})]})})]},a))})},x={render:function(){const[t,se]=w.useState("column"),[v,te]=w.useState(3),[k,ne]=w.useState(!1);return e.jsxs(r,{spacing:6,children:[e.jsxs(r,{direction:"row",spacing:3,flexWrap:"wrap",children:[e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-slate-500",children:"Direction:"}),e.jsxs("select",{value:t,onChange:n=>se(n.target.value),className:"rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800",children:[e.jsx("option",{value:"column",children:"Column"}),e.jsx("option",{value:"row",children:"Row"})]})]}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("span",{className:"text-slate-500",children:"Spacing:"}),e.jsx("input",{type:"range",min:0,max:12,value:v,onChange:n=>te(Number(n.target.value)),className:"w-24"}),e.jsx("span",{className:"text-xs font-mono",children:v})]}),e.jsxs("label",{className:"flex items-center gap-2 text-sm",children:[e.jsx("input",{type:"checkbox",checked:k,onChange:n=>ne(n.target.checked)}),e.jsx("span",{className:"text-slate-500",children:"Divider"})]})]}),e.jsx("div",{className:"bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-dashed border-slate-200 dark:border-slate-700",children:e.jsxs(r,{direction:t,spacing:v,divider:k?e.jsx("div",{className:`${t==="row"?"w-px h-8":"h-px w-full"} bg-slate-300 dark:bg-slate-600 self-center`}):void 0,children:[e.jsx(s,{children:"Item 1"}),e.jsx(s,{children:"Item 2"}),e.jsx(s,{children:"Item 3"})]})}),e.jsx("pre",{className:"text-xs bg-slate-950 text-slate-200 rounded-lg p-3 overflow-x-auto",children:`<ITStack direction="${t}" spacing={${v}}${k?`
  divider={${t==="row"?'<div className="w-px h-8" />':'<div className="h-px w-full" />'}}`:""}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</ITStack>`})]})}},p={render:()=>e.jsx("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg",children:e.jsxs(r,{direction:"row",spacing:2,justifyContent:"between",alignItems:"center",children:[e.jsxs(r,{direction:"row",spacing:1,alignItems:"center",children:[e.jsx("p",{className:"text-sm font-bold text-slate-700 dark:text-slate-200",children:"Document"}),e.jsx("span",{className:"text-xs text-slate-400",children:"• Saved"})]}),e.jsxs(r,{direction:"row",spacing:1,children:[e.jsx("div",{className:"px-3 py-1.5 rounded-md bg-primary-500 text-white text-xs font-medium cursor-pointer",children:"Save"}),e.jsx("div",{className:"px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs cursor-pointer",children:"Cancel"})]})]})})},g={render:()=>e.jsx("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-xl",children:e.jsx(r,{direction:"row",spacing:3,flexWrap:"wrap",children:["First Name","Last Name","Email"].map(a=>e.jsxs("div",{className:"flex-1 min-w-[140px]",children:[e.jsx("p",{className:"text-xs font-semibold text-slate-500 mb-1",children:a}),e.jsx("input",{className:"w-full h-9 rounded-md border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 text-sm",placeholder:a,readOnly:!0})]},a))})})},b={render:()=>{const a=["React","TypeScript","Tailwind CSS","Vite","Storybook","CSS Variables","Flexbox","Accessibility","Dark Mode","Theming","Responsive"];return e.jsx("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg",children:e.jsx(r,{direction:"row",spacing:1,flexWrap:"wrap",children:a.map(t=>e.jsx("span",{className:"px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800",children:t},t))})})}},u={render:()=>e.jsx("div",{className:"bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm",children:e.jsx(r,{spacing:0,divider:e.jsx("div",{className:"h-px bg-slate-100 dark:bg-slate-700"}),children:["Profile Settings","Security & Privacy","Notifications","Billing & Plans","API Keys"].map(a=>e.jsxs("div",{className:"flex items-center justify-between py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors",children:[e.jsx("span",{className:"text-sm text-slate-700 dark:text-slate-200",children:a}),e.jsx("span",{className:"text-slate-300 dark:text-slate-600",children:"→"})]},a))})})},h={render:()=>e.jsxs(r,{spacing:4,alignItems:"center",justifyContent:"center",className:"h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700",children:[e.jsx("h2",{className:"text-2xl font-bold text-slate-800 dark:text-white",children:"Welcome back"}),e.jsx("p",{className:"text-slate-500 dark:text-slate-400 text-sm",children:"Select a workspace to continue"}),e.jsx("div",{className:"px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium cursor-pointer",children:"Get Started"})]})};var N,S,j;d.parameters={...d.parameters,docs:{...(N=d.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    direction: "column",
    spacing: 2
  },
  render: args => <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
}`,...(j=(S=d.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var f,y,I;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    direction: "row",
    spacing: 2
  },
  render: args => <ITStack {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </ITStack>
}`,...(I=(y=o.parameters)==null?void 0:y.docs)==null?void 0:I.source}}};var T,B,C;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <ITStack spacing={6}>
      {(["column", "row", "column-reverse", "row-reverse"] as const).map(dir => <div key={dir}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">{dir}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-dashed border-slate-200 dark:border-slate-700">
            <ITStack direction={dir} spacing={2}>
              <Box>First</Box>
              <Box>Second</Box>
              <Box>Third</Box>
            </ITStack>
          </div>
        </div>)}
    </ITStack>
}`,...(C=(B=l.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var D,P,E;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <ITStack spacing={4}>
      {[0, 1, 2, 4, 6, 8, 10, 12].map(gap => <div key={gap}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">spacing={gap} — {gap * 0.25}rem</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={gap}>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 3</Box>
            </ITStack>
          </div>
        </div>)}
    </ITStack>
}`,...(E=(P=i.parameters)==null?void 0:P.docs)==null?void 0:E.source}}};var W,$,F;c.parameters={...c.parameters,docs:{...(W=c.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => <ITStack spacing={2}>
      {(["start", "center", "end", "between", "around", "evenly"] as const).map(j => <div key={j}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">{j}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={2} justifyContent={j} className="w-full">
              <div className="w-10 h-10 rounded-lg bg-primary-400/60" />
              <div className="w-10 h-10 rounded-lg bg-cyan-400/60" />
              <div className="w-10 h-10 rounded-lg bg-violet-400/60" />
            </ITStack>
          </div>
        </div>)}
    </ITStack>
}`,...(F=($=c.parameters)==null?void 0:$.docs)==null?void 0:F.source}}};var R,A,V;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => <ITStack spacing={2}>
      {(["start", "center", "end", "stretch", "baseline"] as const).map(a => <div key={a}>
          <p className="text-xs font-semibold text-slate-400 mb-1.5">{a}</p>
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
            <ITStack direction="row" spacing={2} alignItems={a} className="h-20 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
              <div className="w-10 h-6 rounded bg-primary-400/60" />
              <div className="w-10 h-12 rounded bg-cyan-400/60" />
              <div className="w-10 h-8 rounded bg-violet-400/60" />
            </ITStack>
          </div>
        </div>)}
    </ITStack>
}`,...(V=(A=m.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var _,H,M;x.parameters={...x.parameters,docs:{...(_=x.parameters)==null?void 0:_.docs,source:{originalSource:`{
  render: function PlaygroundStory() {
    const [direction, setDirection] = useState<"row" | "column">("column");
    const [spacing, setSpacing] = useState(3);
    const [showDivider, setShowDivider] = useState(false);
    return <ITStack spacing={6}>
        <ITStack direction="row" spacing={3} flexWrap="wrap">
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Direction:</span>
            <select value={direction} onChange={e => setDirection(e.target.value as any)} className="rounded border px-2 py-1 text-sm bg-white dark:bg-slate-800">
              <option value="column">Column</option>
              <option value="row">Row</option>
            </select>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Spacing:</span>
            <input type="range" min={0} max={12} value={spacing} onChange={e => setSpacing(Number(e.target.value))} className="w-24" />
            <span className="text-xs font-mono">{spacing}</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={showDivider} onChange={e => setShowDivider(e.target.checked)} />
            <span className="text-slate-500">Divider</span>
          </label>
        </ITStack>
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-dashed border-slate-200 dark:border-slate-700">
          <ITStack direction={direction} spacing={spacing} divider={showDivider ? <div className={\`\${direction === "row" ? "w-px h-8" : "h-px w-full"} bg-slate-300 dark:bg-slate-600 self-center\`} /> : undefined}>
            <Box>Item 1</Box>
            <Box>Item 2</Box>
            <Box>Item 3</Box>
          </ITStack>
        </div>
        <pre className="text-xs bg-slate-950 text-slate-200 rounded-lg p-3 overflow-x-auto">
{\`<ITStack direction="\${direction}" spacing={\${spacing}}\${showDivider ? \`\\n  divider={\${direction === "row" ? '<div className="w-px h-8" />' : '<div className="h-px w-full" />'}}\` : ""}>
  <Box>Item 1</Box>
  <Box>Item 2</Box>
  <Box>Item 3</Box>
</ITStack>\`}
        </pre>
      </ITStack>;
  }
}`,...(M=(H=x.parameters)==null?void 0:H.docs)==null?void 0:M.source}}};var O,L,z;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg">
      <ITStack direction="row" spacing={2} justifyContent="between" alignItems="center">
        <ITStack direction="row" spacing={1} alignItems="center">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Document</p>
          <span className="text-xs text-slate-400">• Saved</span>
        </ITStack>
        <ITStack direction="row" spacing={1}>
          <div className="px-3 py-1.5 rounded-md bg-primary-500 text-white text-xs font-medium cursor-pointer">Save</div>
          <div className="px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs cursor-pointer">Cancel</div>
        </ITStack>
      </ITStack>
    </div>
}`,...(z=(L=p.parameters)==null?void 0:L.docs)==null?void 0:z.source}}};var G,J,K;g.parameters={...g.parameters,docs:{...(G=g.parameters)==null?void 0:G.docs,source:{originalSource:`{
  render: () => <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-xl">
      <ITStack direction="row" spacing={3} flexWrap="wrap">
        {["First Name", "Last Name", "Email"].map(label => <div key={label} className="flex-1 min-w-[140px]">
            <p className="text-xs font-semibold text-slate-500 mb-1">{label}</p>
            <input className="w-full h-9 rounded-md border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 px-3 text-sm" placeholder={label} readOnly />
          </div>)}
      </ITStack>
    </div>
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};var q,Q,U;b.parameters={...b.parameters,docs:{...(q=b.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const tags = ["React", "TypeScript", "Tailwind CSS", "Vite", "Storybook", "CSS Variables", "Flexbox", "Accessibility", "Dark Mode", "Theming", "Responsive"];
    return <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 w-full max-w-lg">
        <ITStack direction="row" spacing={1} flexWrap="wrap">
          {tags.map(tag => <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800">
              {tag}
            </span>)}
        </ITStack>
      </div>;
  }
}`,...(U=(Q=b.parameters)==null?void 0:Q.docs)==null?void 0:U.source}}};var X,Y,Z;u.parameters={...u.parameters,docs:{...(X=u.parameters)==null?void 0:X.docs,source:{originalSource:`{
  render: () => <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 w-full max-w-sm">
      <ITStack spacing={0} divider={<div className="h-px bg-slate-100 dark:bg-slate-700" />}>
        {["Profile Settings", "Security & Privacy", "Notifications", "Billing & Plans", "API Keys"].map(item => <div key={item} className="flex items-center justify-between py-3 px-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
            <span className="text-sm text-slate-700 dark:text-slate-200">{item}</span>
            <span className="text-slate-300 dark:text-slate-600">→</span>
          </div>)}
      </ITStack>
    </div>
}`,...(Z=(Y=u.parameters)==null?void 0:Y.docs)==null?void 0:Z.source}}};var ee,ae,re;h.parameters={...h.parameters,docs:{...(ee=h.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  render: () => <ITStack spacing={4} alignItems="center" justifyContent="center" className="h-64 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome back</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm">Select a workspace to continue</p>
      <div className="px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-medium cursor-pointer">Get Started</div>
    </ITStack>
}`,...(re=(ae=h.parameters)==null?void 0:ae.docs)==null?void 0:re.source}}};const oe=["Vertical","Horizontal","AllDirections","SpacingVariants","JustifyContent","AlignItems","Playground","ToolbarExample","FormRowExample","TagCloudExample","SectionWithDividers","CenteredHero"],ie=Object.freeze(Object.defineProperty({__proto__:null,AlignItems:m,AllDirections:l,CenteredHero:h,FormRowExample:g,Horizontal:o,JustifyContent:c,Playground:x,SectionWithDividers:u,SpacingVariants:i,TagCloudExample:b,ToolbarExample:p,Vertical:d,__namedExportsOrder:oe,default:de},Symbol.toStringTag,{value:"Module"}));export{ie as S};
