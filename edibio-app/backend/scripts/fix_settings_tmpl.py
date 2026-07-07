
with open('d:/edibio-app/app/company/settings/page.tsx', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix line 230 - ut setter type issue when f is undefined
code = code.replace(
    "const ut = (k: string, v: any) => setTmpl(f => ({ ...f, [k]: v }));",
    "const ut = (k: string, v: any) => setTmpl(f => f ? { ...f, [k]: v } : f);"
)

# Fix updateTemplate(tmpl.id, tmpl) in handleSaveTemplate  
code = code.replace(
    "updateTemplate(tmpl.id, tmpl);\n        setSelectedTemplate(tmpl);",
    "updateTemplate(tmpl!.id, tmpl);\n        setSelectedTemplate(tmpl);"
)

# Fix updateTemplate(tmpl?.id, -> if(tmpl) updateTemplate(tmpl.id,
code = code.replace("updateTemplate(tmpl?.id,", "if(tmpl) updateTemplate(tmpl.id,")

with open('d:/edibio-app/app/company/settings/page.tsx', 'w', encoding='utf-8') as f:
    f.write(code)
print('All replacements done')
