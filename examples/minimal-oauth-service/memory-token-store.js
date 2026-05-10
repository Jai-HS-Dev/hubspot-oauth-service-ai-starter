const installations = new Map();

async function saveInstallation(portalId, installation) {
  installations.set(String(portalId), {
    ...installation,
    updatedAt: new Date().toISOString()
  });
}

async function getInstallation(portalId) {
  return installations.get(String(portalId)) || null;
}

async function deleteInstallation(portalId) {
  return installations.delete(String(portalId));
}

module.exports = {
  deleteInstallation,
  getInstallation,
  saveInstallation
};

