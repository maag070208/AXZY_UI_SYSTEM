import{j as N}from"./jsx-runtime-D_zvdyIk.js";import{c as I,t as V,m as b,I as H,s as a,f as l,a as E}from"./calendar-CokE-T93.js";import"./iframe-Dr0sZusW.js";import"./preload-helper-C1FmrZbK.js";import"./clsx-B-dksMZM.js";import"./index-CJju9sOb.js";function M(e,s,d){return I(e,+V(e)+s)}function t(e,s,d){return M(e,s*b)}const _={title:"Components/Data Display/ITCalendar",component:H,parameters:{layout:"padded"},tags:["autodocs"],argTypes:{mode:{control:"select",options:["month","week","day"],description:"View mode of the calendar"},value:{control:"date"},onEventClick:{action:"event clicked"},onSlotClick:{action:"slot clicked"},onSelectRange:{action:"range selected"}}},o=new Date,i=E(o,1),C=[{id:"1",title:"Team Meeting",start:t(a(o),9),end:t(a(o),10.5),color:"#3b82f6"},{id:"2",title:"Lunch Break",start:t(a(o),13),end:t(a(o),14),color:"#f97316"},{id:"3",title:"Project Review",start:t(a(i),11),end:t(a(i),12.5),color:"#8b5cf6"}],n={args:{mode:"week",events:C,className:"h-[600px]"}},r={args:{mode:"day",events:C,className:"h-[600px]"}},c={args:{mode:"month",value:o,onChange:e=>console.log("Date selected:",e),className:"h-[400px] max-w-md"}},m={render:e=>N.jsx(H,{...e,onSelectRange:(s,d)=>alert(`Selected: ${l(s,"HH:mm")} - ${l(d,"HH:mm")}`)}),args:{mode:"week",className:"h-[600px]",events:[]}};var p,u,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    mode: 'week',
    events: sampleEvents,
    className: 'h-[600px]'
  }
}`,...(g=(u=n.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var h,v,w;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    mode: 'day',
    events: sampleEvents,
    className: 'h-[600px]'
  }
}`,...(w=(v=r.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var x,f,k;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    mode: 'month',
    value: today,
    onChange: date => console.log('Date selected:', date),
    className: 'h-[400px] max-w-md'
  }
}`,...(k=(f=c.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var y,S,D;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => {
    // Mock interactivity could be complex in storybook args, 
    // but the component handles internal drag state for valid callbacks.
    return <ITCalendar {...args} onSelectRange={(start, end) => alert(\`Selected: \${format(start, 'HH:mm')} - \${format(end, 'HH:mm')}\`)} />;
  },
  args: {
    mode: 'week',
    className: 'h-[600px]',
    events: []
  }
}`,...(D=(S=m.parameters)==null?void 0:S.docs)==null?void 0:D.source}}};const B=["WeekView","DayView","MonthView","WithInteractiveSelection"];export{r as DayView,c as MonthView,n as WeekView,m as WithInteractiveSelection,B as __namedExportsOrder,_ as default};
