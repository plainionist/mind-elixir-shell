use tauri::menu::*;
use tauri::Emitter;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
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
                    app.emit("menu:open", {}).expect("Emit 'menu:open' failed");
                } else if event.id() == "save" {
                    app.emit("menu:save", {}).expect("Emit 'menu:save' failed");
                } else if event.id() == "export-svg" {
                    app.emit("menu:export-svg", {}).expect("Emit 'menu:export-svg' failed");
                }
            });

            #[cfg(debug_assertions)]
            {
                let window = app.get_webview_window("main").unwrap();
                window.open_devtools();
            }
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
