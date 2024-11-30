const booksOfBible = [
  { name: "GEN", count: 50 },
  { name: "EXO", count: 40 },
  { name: "LEV", count: 27 },
  { name: "NUM", count: 36 },
  { name: "DEU", count: 34 },
  { name: "JOS", count: 24 },
  { name: "JDG", count: 21 },
  { name: "RUT", count: 4 },
  { name: "1SA", count: 31 },
  { name: "2SA", count: 24 },
  { name: "1KI", count: 22 },
  { name: "2KI", count: 25 },
  { name: "1CH", count: 29 },
  { name: "2CH", count: 36 },
  { name: "EZR", count: 10 },
  { name: "NEH", count: 13 },
  { name: "EST", count: 10 },
  { name: "JOB", count: 42 },
  { name: "PSA", count: 150 },
  { name: "PRO", count: 31 },
  { name: "ECC", count: 12 },
  { name: "SON", count: 8 },
  { name: "ISA", count: 66 },
  { name: "JER", count: 52 },
  { name: "LAM", count: 5 },
  { name: "EZE", count: 48 },
  { name: "DAN", count: 12 },
  { name: "HOS", count: 14 },
  { name: "JOE", count: 3 },
  { name: "AMO", count: 9 },
  { name: "OBA", count: 1 },
  { name: "JON", count: 4 },
  { name: "MIC", count: 7 },
  { name: "NAH", count: 3 },
  { name: "HAB", count: 3 },
  { name: "ZEP", count: 3 },
  { name: "HAG", count: 2 },
  { name: "ZEC", count: 14 },
  { name: "MAL", count: 4 },
  { name: "MAT", count: 28 },
  { name: "MAR", count: 16 },
  { name: "LUK", count: 24 },
  { name: "JOH", count: 21 },
  { name: "ACT", count: 28 },
  { name: "ROM", count: 16 },
  { name: "1CO", count: 16 },
  { name: "2CO", count: 13 },
  { name: "GAL", count: 6 },
  { name: "EPH", count: 6 },
  { name: "PHI", count: 4 },
  { name: "COL", count: 4 },
  { name: "1TH", count: 5 },
  { name: "2TH", count: 3 },
  { name: "1TI", count: 6 },
  { name: "2TI", count: 4 },
  { name: "TIT", count: 3 },
  { name: "PHM", count: 1 },
  { name: "HEB", count: 13 },
  { name: "JAM", count: 5 },
  { name: "1PE", count: 5 },
  { name: "2PE", count: 3 },
  { name: "1JO", count: 5 },
  { name: "2JO", count: 1 },
  { name: "3JO", count: 1 },
  { name: "JUD", count: 1 },
  { name: "REV", count: 22 },
]

function getBibleBookChapter(translate_name, book, chapter) {
  var BIBLES_DIR_NAME = "bibles"
  var Api = Java.type("noppes.npcs.api.NpcAPI").Instance()
  var File = Java.type("java.io.File")
  var Files = Java.type("java.nio.file.Files")
  var Paths = Java.type("java.nio.file.Paths")

  var world_dir = Api.getWorldDir()
  var bibles_dir = new File(world_dir, BIBLES_DIR_NAME)
  var translate_dir = new File(bibles_dir, translate_name)
  var file_chapter_name = book + "." + chapter.toString() + ".json"
  var file_chapter = new File(translate_dir, file_chapter_name)
  if (file_chapter.exists() && file_chapter.isFile()) {
    var file_chapter_path = Paths.get(file_chapter.getAbsolutePath())
    var file_chapter_content = Files.readAllLines(file_chapter_path)[0]
    return JSON.parse(file_chapter_content)
  } else return null
}
