import{aF as C,aG as N,aH as I,aI as H,aJ as a,j as V,aK as m,aL as j}from"./iframe-B5RMobo9.js";function E(e,s,l){return C(e,+N(e)+s)}function t(e,s,l){return E(e,s*I)}const M={title:"Components/Data Display/ITCalendar",component:H,parameters:{layout:"padded"},argTypes:{mode:{control:"select",options:["month","week","day"],description:"View mode of the calendar"},value:{control:"date"},onEventClick:{action:"event clicked"},onSlotClick:{action:"slot clicked"},onSelectRange:{action:"range selected"}}},o=new Date,i=j(o,1),b=[{id:"1",title:"Team Meeting",start:t(a(o),9),end:t(a(o),10.5),color:"#3b82f6"},{id:"2",title:"Lunch Break",start:t(a(o),13),end:t(a(o),14),color:"#f97316"},{id:"3",title:"Project Review",start:t(a(i),11),end:t(a(i),12.5),color:"#8b5cf6"}],n={args:{mode:"week",events:b,className:"h-[600px]"}},r={args:{mode:"day",events:b,className:"h-[600px]"}},c={args:{mode:"month",value:o,onChange:e=>console.log("Date selected:",e),className:"h-[400px] max-w-md"}},d={render:e=>V.jsx(H,{...e,onSelectRange:(s,l)=>alert(`Selected: ${m(s,"HH:mm")} - ${m(l,"HH:mm")}`)}),args:{mode:"week",className:"h-[600px]",events:[]}};var p,u,g;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(w=(v=r.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var x,y,S;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    mode: 'month',
    value: today,
    onChange: date => console.log('Date selected:', date),
    className: 'h-[400px] max-w-md'
  }
}`,...(S=(y=c.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var f,k,D;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(D=(k=d.parameters)==null?void 0:k.docs)==null?void 0:D.source}}};const T=["WeekView","DayView","MonthView","WithInteractiveSelection"],R=Object.freeze(Object.defineProperty({__proto__:null,DayView:r,MonthView:c,WeekView:n,WithInteractiveSelection:d,__namedExportsOrder:T,default:M},Symbol.toStringTag,{value:"Module"}));export{R as S};
