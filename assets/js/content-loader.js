/* =============================================================================
   This file reads the project folders and protects the rest of the portfolio.

   André does not need to change anything here. To add, hide or reorder work,
   follow the plain-language guide in content/LEIA-ME.md.
============================================================================= */

(function () {
  "use strict";

  var LANGUAGES = [
    { file: "português", site: "pt" },
    { file: "inglês", site: "en" },
    { file: "espanhol", site: "es" },
  ];
  var TEXT_FIELDS = ["título", "resumo", "problema", "como foi feito", "ferramentas"];
  var LIST_FIELDS = ["resultados", "aprendizados"];
  var FOLDER_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  var IMAGE_NAME = /^[a-zA-Z0-9][a-zA-Z0-9._-]*\.(?:avif|gif|jpe?g|png|svg|webp)$/i;

  function isObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function hasText(value) {
    return typeof value === "string" && value.trim().length > 0;
  }

  function hasTextList(value) {
    return Array.isArray(value) && value.length > 0 && value.every(hasText);
  }

  function repositoryIsValid(value) {
    if (value === "") return true;
    if (!hasText(value)) return false;
    try {
      var address = new URL(value);
      return address.protocol === "https:" || address.protocol === "http:";
    } catch (error) {
      return false;
    }
  }

  function projectFileIsComplete(data) {
    if (!isObject(data) || !repositoryIsValid(data["endereço público"])) return false;
    if (!Array.isArray(data.imagens) || data.imagens.length === 0) return false;
    if (!isObject(data.textos)) return false;

    var imagesAreComplete = data.imagens.every(function (image) {
      if (!isObject(image) || !IMAGE_NAME.test(image["nome do arquivo"] || "") || !isObject(image["descrição"])) return false;
      return LANGUAGES.every(function (language) { return hasText(image["descrição"][language.file]); });
    });
    if (!imagesAreComplete) return false;

    return LANGUAGES.every(function (language) {
      var text = data.textos[language.file];
      if (!isObject(text)) return false;
      return TEXT_FIELDS.every(function (field) { return hasText(text[field]); })
        && LIST_FIELDS.every(function (field) { return hasTextList(text[field]); });
    });
  }

  async function readJson(address) {
    var response = await fetch(address, { cache: "no-cache" });
    if (!response.ok) throw new Error("not-found");
    return response.json();
  }

  async function imageExists(address) {
    try {
      var response = await fetch(address, { method: "HEAD", cache: "no-cache" });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  function prepareProject(folder, data) {
    var folderAddress = "content/projects/" + folder + "/";
    var gallery = data.imagens.map(function (image) {
      var translations = {};
      LANGUAGES.forEach(function (language) {
        translations[language.site] = {
          alt: image["descrição"][language.file].trim(),
          caption: image["descrição"][language.file].trim(),
        };
      });
      return {
        src: folderAddress + image["nome do arquivo"],
        i18n: translations,
      };
    });

    var translations = {};
    LANGUAGES.forEach(function (language) {
      var text = data.textos[language.file];
      translations[language.site] = {
        title: text["título"].trim(),
        summary: text.resumo.trim(),
        problem: text.problema.trim(),
        approach: text["como foi feito"].trim(),
        tools: text.ferramentas.trim(),
        results: text.resultados.map(function (item) { return item.trim(); }),
        insights: text.aprendizados.map(function (item) { return item.trim(); }),
      };
    });

    return {
      id: folder,
      cover: gallery[0].src,
      gallery: gallery,
      repo: data["endereço público"].trim(),
      i18n: translations,
    };
  }

  async function loadOneProject(folder) {
    var folderAddress = "content/projects/" + folder + "/";
    try {
      var data = await readJson(folderAddress + "project.json");
      if (!projectFileIsComplete(data)) return null;

      var imageChecks = await Promise.all(data.imagens.map(function (image) {
        return imageExists(folderAddress + image["nome do arquivo"]);
      }));
      if (imageChecks.some(function (exists) { return !exists; })) return null;

      return prepareProject(folder, data);
    } catch (error) {
      return null;
    }
  }

  async function loadProjects() {
    var folders;
    try {
      folders = await readJson("content/projects.json");
    } catch (error) {
      return [];
    }

    if (!Array.isArray(folders)) return [];

    // A repeated, empty or unsafe name is left out without affecting the rest.
    var seen = new Set();
    var safeFolders = folders.filter(function (folder) {
      if (!hasText(folder) || !FOLDER_NAME.test(folder) || seen.has(folder)) return false;
      seen.add(folder);
      return true;
    });

    var loaded = await Promise.all(safeFolders.map(loadOneProject));
    return loaded.filter(Boolean);
  }

  window.ProjectContent = { loadProjects: loadProjects };
})();
