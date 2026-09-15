import{j as e,C as s,b as p,r as t,Y as S,Q as P,y as E,i as W,K as O,D as z,z as B}from"./iframe-B5RMobo9.js";import"./preload-helper-C1FmrZbK.js";const L={title:"Isolation/CSS Encapsulation",parameters:{layout:"padded",docs:{description:{component:"Validación de aislamiento: un componente hijo (ITDatePicker) dentro de un contenedor (ITCard) no debe heredar ni colisionar estilos del padre, y viceversa."}}}},m=()=>{const[r,a]=t.useState(new Date);return e.jsx(z,{name:"inside-card-date",label:"Fecha",value:r,onChange:n=>a(n.target.value)})},M=()=>{const[r,a]=t.useState("");return e.jsx(W,{name:"name",label:"Nombre",placeholder:"Escribe tu nombre",value:r,onChange:n=>a(n.target.value)})},A=()=>{const[r,a]=t.useState("");return e.jsx(B,{name:"notes",label:"Notas",placeholder:"Detalles...",value:r,onChange:n=>a(n.target.value)})},G=()=>{const[r,a]=t.useState("");return e.jsx(O,{name:"country",label:"País",placeholder:"Selecciona",value:r,options:[{value:"mx",label:"México"},{value:"us",label:"Estados Unidos"},{value:"es",label:"España"}],onChange:n=>a(n.target.value)})},o={render:()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs(s,{title:"Card A",children:[e.jsx("p",{className:"mb-4 text-secondary-600",children:"Un ITDatePicker dentro de un ITCard. Sus estilos son independientes: el popover del calendario, el input y el label no se ven afectados por la tipografía/color del card."}),e.jsx(m,{})]}),e.jsxs(s,{title:"Card B",onClick:()=>{},children:[e.jsx("p",{className:"mb-4 text-secondary-600",children:"Card interactivo (hover). El date picker hermano debe seguir comportándose igual, sin contaminación visual entre ambos cards."}),e.jsx(m,{})]})]})},l={render:()=>e.jsxs(s,{title:"Formulario en Card",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsx(M,{}),e.jsx(G,{}),e.jsx(m,{}),e.jsx(A,{})]}),e.jsxs("div",{className:"mt-4 flex justify-end gap-2",children:[e.jsx(p,{variant:"outlined",color:"secondary",label:"Cancelar"}),e.jsx(p,{variant:"filled",color:"primary",label:"Guardar"})]})]})},d={render:()=>{const[r,a]=t.useState(!1);return e.jsxs(s,{title:"Card con Diálogo",children:[e.jsx("p",{className:"mb-4 text-secondary-600",children:"Un ITDialog (fixed overlay) lanzado desde un ITCard. El overlay y su contenido usan su propio stacking context y estilos."}),e.jsx(p,{variant:"filled",color:"primary",label:"Abrir diálogo",onClick:()=>a(!0)}),e.jsxs(S,{isOpen:r,onClose:()=>a(!1),title:"Diálogo desde Card",children:[e.jsx("p",{className:"text-secondary-700",children:"Contenido del diálogo. Estilos propios, sin interferencia del card."}),e.jsx("div",{className:"mt-4 flex justify-end",children:e.jsx(p,{variant:"outlined",color:"secondary",label:"Cerrar",onClick:()=>a(!1)})})]})]})}},i={render:()=>e.jsxs(s,{title:"Tabla en Card",children:[e.jsx(P,{data:[{id:1,name:"Juan Pérez",city:"CDMX"},{id:2,name:"Ana García",city:"Guadalajara"},{id:3,name:"Luis Martínez",city:"Monterrey"}],columns:[{key:"id",label:"ID",type:"number"},{key:"name",label:"Nombre",type:"string"},{key:"city",label:"Ciudad",type:"string"}]}),e.jsx(E,{as:"p",className:"mt-3 text-sm text-secondary-500",children:"La tabla ocupa todo el ancho del card y conserva su propio estilo."})]})},c={render:()=>e.jsxs(s,{title:"Card externo",children:[e.jsx("p",{className:"mb-4 text-secondary-600",children:"Cards anidados: el interno (interactivo) no altera el externo."}),e.jsx(s,{title:"Card interno",onClick:()=>{},children:e.jsx(m,{})})]})};var u,C,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ITCard title="Card A">
        <p className="mb-4 text-secondary-600">
          Un ITDatePicker dentro de un ITCard. Sus estilos son independientes:
          el popover del calendario, el input y el label no se ven afectados por
          la tipografía/color del card.
        </p>
        <DatePickerWrapper />
      </ITCard>
      <ITCard title="Card B" onClick={() => {}}>
        <p className="mb-4 text-secondary-600">
          Card interactivo (hover). El date picker hermano debe seguir
          comportándose igual, sin contaminación visual entre ambos cards.
        </p>
        <DatePickerWrapper />
      </ITCard>
    </div>
}`,...(x=(C=o.parameters)==null?void 0:C.docs)==null?void 0:x.source}}};var y,I,T;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <ITCard title="Formulario en Card">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputWrapper />
        <SelectWrapper />
        <DatePickerWrapper />
        <TextareaWrapper />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <ITButton variant="outlined" color="secondary" label="Cancelar" />
        <ITButton variant="filled" color="primary" label="Guardar" />
      </div>
    </ITCard>
}`,...(T=(I=l.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var g,b,v;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <ITCard title="Card con Diálogo">
        <p className="mb-4 text-secondary-600">
          Un ITDialog (fixed overlay) lanzado desde un ITCard. El overlay y su
          contenido usan su propio stacking context y estilos.
        </p>
        <ITButton variant="filled" color="primary" label="Abrir diálogo" onClick={() => setOpen(true)} />
        <ITDialog isOpen={open} onClose={() => setOpen(false)} title="Diálogo desde Card">
          <p className="text-secondary-700">
            Contenido del diálogo. Estilos propios, sin interferencia del card.
          </p>
          <div className="mt-4 flex justify-end">
            <ITButton variant="outlined" color="secondary" label="Cerrar" onClick={() => setOpen(false)} />
          </div>
        </ITDialog>
      </ITCard>;
  }
}`,...(v=(b=d.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var j,h,D;i.parameters={...i.parameters,docs:{...(j=i.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <ITCard title="Tabla en Card">
      <ITTable data={[{
      id: 1,
      name: "Juan Pérez",
      city: "CDMX"
    }, {
      id: 2,
      name: "Ana García",
      city: "Guadalajara"
    }, {
      id: 3,
      name: "Luis Martínez",
      city: "Monterrey"
    }]} columns={[{
      key: "id",
      label: "ID",
      type: "number"
    }, {
      key: "name",
      label: "Nombre",
      type: "string"
    }, {
      key: "city",
      label: "Ciudad",
      type: "string"
    }]} />
      <ITText as="p" className="mt-3 text-sm text-secondary-500">
        La tabla ocupa todo el ancho del card y conserva su propio estilo.
      </ITText>
    </ITCard>
}`,...(D=(h=i.parameters)==null?void 0:h.docs)==null?void 0:D.source}}};var k,f,N;c.parameters={...c.parameters,docs:{...(k=c.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <ITCard title="Card externo">
      <p className="mb-4 text-secondary-600">
        Cards anidados: el interno (interactivo) no altera el externo.
      </p>
      <ITCard title="Card interno" onClick={() => {}}>
        <DatePickerWrapper />
      </ITCard>
    </ITCard>
}`,...(N=(f=c.parameters)==null?void 0:f.docs)==null?void 0:N.source}}};const V=["ITDatePickerInsideCard","FormControlsInsideCard","ITDialogInsideCard","ITTableInsideCard","NestedCards"];export{l as FormControlsInsideCard,o as ITDatePickerInsideCard,d as ITDialogInsideCard,i as ITTableInsideCard,c as NestedCards,V as __namedExportsOrder,L as default};
