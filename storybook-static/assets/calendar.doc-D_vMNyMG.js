import{j as e}from"./iframe-B5RMobo9.js";import{u as r,M as s,P as t,C as a,S as c}from"./blocks-DefDVuP9.js";import{S as o}from"./calendar.stories-B2V4wX72.js";import"./preload-helper-C1FmrZbK.js";function i(d){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...d.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{of:o}),`
`,e.jsx(n.h1,{id:"itcalendar",children:"ITCalendar"}),`
`,e.jsx(n.p,{children:"A full-featured calendar and date picker component with week, day, and month views. Supports event display with colored indicators, date selection (single and range modes), drag-to-select time ranges, and min/max date boundaries with month/year navigation."}),`
`,e.jsx(n.h2,{id:"props",children:"Props"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"events"})," | ",e.jsx(n.code,{children:"CalendarEvent[]"})," | ",e.jsx(n.code,{children:"[]"}),` | Array of calendar events to display in the scheduler view. |
| `,e.jsx(n.code,{children:"mode"})," | ",e.jsx(n.code,{children:'"week" \\| "day" \\| "month"'})," | auto | Display mode. Auto-detected as ",e.jsx(n.code,{children:'"month"'})," when ",e.jsx(n.code,{children:"onChange"}),` is provided. |
| `,e.jsx(n.code,{children:"onEventClick"})," | ",e.jsx(n.code,{children:"(event: CalendarEvent) => void"}),` | — | Callback fired when an event is clicked. |
| `,e.jsx(n.code,{children:"onSlotClick"})," | ",e.jsx(n.code,{children:"(date: Date) => void"}),` | — | Callback fired when an empty time slot is clicked. |
| `,e.jsx(n.code,{children:"onSlotHover"})," | ",e.jsx(n.code,{children:"(date: Date) => void"}),` | — | Callback fired when the mouse enters a time slot. |
| `,e.jsx(n.code,{children:"onSelectRange"})," | ",e.jsx(n.code,{children:"(start: Date, end: Date) => void"}),` | — | Callback fired when a time range is selected via drag. |
| `,e.jsx(n.code,{children:"value"})," | ",e.jsx(n.code,{children:"Date"}),` | — | Currently selected date (picker mode). |
| `,e.jsx(n.code,{children:"onChange"})," | ",e.jsx(n.code,{children:"(date: Date) => void"}),` | — | Callback fired when a date is selected in picker mode. |
| `,e.jsx(n.code,{children:"selectionMode"})," | ",e.jsx(n.code,{children:'"single" \\| "range"'})," | ",e.jsx(n.code,{children:'"single"'}),` | Selection mode for the date picker. |
| `,e.jsx(n.code,{children:"startDate"})," | ",e.jsx(n.code,{children:"Date"}),` | — | Start date for range selection. |
| `,e.jsx(n.code,{children:"endDate"})," | ",e.jsx(n.code,{children:"Date"}),` | — | End date for range selection. |
| `,e.jsx(n.code,{children:"minDate"})," | ",e.jsx(n.code,{children:"Date"}),` | — | Minimum selectable date (dates before are disabled). |
| `,e.jsx(n.code,{children:"maxDate"})," | ",e.jsx(n.code,{children:"Date"}),` | — | Maximum selectable date (dates after are disabled). |
| `,e.jsx(n.code,{children:"className"})," | ",e.jsx(n.code,{children:"string"}),` | — | Additional CSS class names for the calendar container. |
| `,e.jsx(n.code,{children:"disabled"})," | ",e.jsx(n.code,{children:"boolean"})," | ",e.jsx(n.code,{children:"false"}),` | Whether the calendar is in a disabled state. |
| `,e.jsx(n.code,{children:"variant"})," | ",e.jsx(n.code,{children:"ColorsTypes"})," | ",e.jsx(n.code,{children:'"primary"'})," | Accent color theme for selection highlights. |"]}),`
`,e.jsx(n.h3,{id:"calendarevent",children:"CalendarEvent"}),`
`,e.jsxs(n.p,{children:[`| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `,e.jsx(n.code,{children:"id"})," | ",e.jsx(n.code,{children:"string"}),` | required | Unique identifier for the event. |
| `,e.jsx(n.code,{children:"title"})," | ",e.jsx(n.code,{children:"string"}),` | required | Event display title. |
| `,e.jsx(n.code,{children:"start"})," | ",e.jsx(n.code,{children:"Date \\| string"}),` | required | Event start date/time. |
| `,e.jsx(n.code,{children:"end"})," | ",e.jsx(n.code,{children:"Date \\| string"}),` | required | Event end date/time. |
| `,e.jsx(n.code,{children:"color"})," | ",e.jsx(n.code,{children:"string"}),` | — | Event indicator color (hex or CSS value). |
| `,e.jsx(n.code,{children:"data"})," | ",e.jsx(n.code,{children:"any"})," | — | Arbitrary extra data passed through to event callbacks. |"]}),`
`,e.jsx(n.h2,{id:"usage",children:"Usage"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`import { ITCalendar } from '@axzydev/axzy_ui_system';

<ITCalendar mode="month" onChange={(date) => console.log(date)} variant="primary" />

<ITCalendar
  mode="week"
  events={[
    { id: "1", title: "Reunión", start: new Date(), end: new Date(), color: "#3b82f6" }
  ]}
  onEventClick={(evt) => console.log(evt)}
  className="h-[600px]"
/>
`})}),`
`,e.jsx(n.h2,{id:"variants--notes",children:"Variants / Notes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"month"})," — Traditional month grid with date picker, single and range selection modes."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"week"})," — 7-column time grid from 6 AM to 10 PM with event overlays and drag-to-select range."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"day"})," — Single-column time grid for focused daily scheduling."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"years"})," — Click the month/year header to switch to a year selection view (12-year grid)."]}),`
`,e.jsxs(n.li,{children:["Uses ",e.jsx(n.code,{children:"date-fns"})," with Spanish locale (",e.jsx(n.code,{children:"es"}),") for month and weekday names."]}),`
`,e.jsxs(n.li,{children:["Month view supports ",e.jsx(n.code,{children:"minDate"}),"/",e.jsx(n.code,{children:"maxDate"})," boundaries — out-of-range dates are disabled and dimmed."]}),`
`,e.jsxs(n.li,{children:["Events render as colored bars in week/day views with customizable ",e.jsx(n.code,{children:"color"})," prop."]}),`
`,e.jsx(n.li,{children:"Week/day views show the current time as a red indicator line when viewing today."}),`
`,e.jsxs(n.li,{children:["Drag-to-select time ranges is enabled when ",e.jsx(n.code,{children:"onSelectRange"})," is provided."]}),`
`]}),`
`,e.jsx(n.h2,{id:"stories",children:"Stories"}),`
`,e.jsx(t,{}),`
`,e.jsx(a,{}),`
`,e.jsx(c,{})]})}function m(d={}){const{wrapper:n}={...r(),...d.components};return n?e.jsx(n,{...d,children:e.jsx(i,{...d})}):i(d)}export{m as default};
