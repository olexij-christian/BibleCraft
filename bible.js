
function getBibleBookChapter(translate_name, book, chapter) {
  var BIBLES_DIR_NAME = "bibles";
  var Api = Java.type("noppes.npcs.api.NpcAPI").Instance()
  var File = Java.type("java.io.File")
  var Files = Java.type("java.nio.file.Files")
  var Paths = Java.type("java.nio.file.Paths")

  var world_dir = Api.getWorldDir()
  var bibles_dir = new File(world_dir, BIBLES_DIR_NAME)
  var translate_dir = new File(bibles_dir, translate_name)
  var file_chapter_name = book + '.' + chapter.toString() + ".json";
  var file_chapter = new File(translate_dir, file_chapter_name)
  if ( file_chapter.exists() && file_chapter.isFile() ) {
    var file_chapter_path = Paths.get( file_chapter.getAbsolutePath() )
    var file_chapter_content = Files.readAllLines(file_chapter_path)[0]
    return JSON.parse(file_chapter_content)
  } else return null
}
