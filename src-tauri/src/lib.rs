use tauri::menu::*;
use tauri::Emitter;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let file_menu = SubmenuBuilder::new(app, "File")
                .text("open", "Open")
                .text("save", "Save")
                .text("export-svg", "Export SVG")
                .separator()
                .quit()
                .build()?;

            let menu = MenuBuilder::new(app).item(&file_menu).build()?;

            app.set_menu(menu)?;

            app.on_menu_event(move |app, event| {
                if event.id() == "open" {
                    app.emit("menu:open", {})
                        .expect("Failed to emit event 'menu:open'");
                } else if event.id() == "save" {
                    app.emit("menu:save", {})
                        .expect("Failed to emit event 'menu:save'");
                } else if event.id() == "export-svg" {
                    app.emit("menu:export-svg", {})
                        .expect("Failed to emit event 'menu:export-svg'");
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
