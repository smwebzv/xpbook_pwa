// webauthn.js

// Helper to convert ArrayBuffer to Base64URL
function arrayBufferToBase64URL(buffer) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function base64UrlToUint8Array(base64url) {
  const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array;
}

function arrayBufferToBase64(buffer) {
  const byteArray = new Uint8Array(buffer);
  let binaryString = "";
  for (const byte of byteArray) {
    binaryString += String.fromCharCode(byte);
  }
  return btoa(binaryString);
}

callCreateCredentialWithCallback = function (publicKey, callback) {
  createCredential(publicKey)
    .then((credential) => callback(null, credential))
    .catch((error) => callback(error, null));
};

callCreateCredentialAuthOptionWithCallback = function (publicKey, callback) {
  verifyCredential(publicKey)
    .then((credential) => callback(null, credential))
    .catch((error) => callback(error, null));
};

async function createCredential({ data }) {
  try {
    const challengeArrayBuffer = new Uint8Array(data.challenge.data).buffer;
    const publicKey = {
      ...data,
      challenge: challengeArrayBuffer,
      user: {
        ...data.user,
        id: base64UrlToUint8Array(data.user.id).buffer,
      },
    };
    const credential = await navigator.credentials.create({
      publicKey: publicKey,
    });
    console.log(credential);
    const response = credential.response;

    // Convert binary fields to Base64URL
    const attestationObject = arrayBufferToBase64URL(
      response.attestationObject
    );
    const clientDataJSON = arrayBufferToBase64URL(response.clientDataJSON);
    const rawId = arrayBufferToBase64URL(credential.rawId);

    return {
      id: credential.id,
      rawId: rawId,
      type: credential.type,
      challenge: data.challenge,
      userId: data.user.displayName,
      response: {
        attestationObject: attestationObject,
        clientDataJSON: clientDataJSON,
      },
    };
  } catch (error) {
    console.error("Error creating credential:", error);
    return null;
  }
}

async function verifyCredential({ data }) {
  try {
    const challengeArrayBuffer = new Uint8Array(data.challenge.data).buffer;
    const publicKey = {
      ...data,
      challenge: challengeArrayBuffer,
    };

    const assertion = await navigator.credentials.get({ publicKey });

    const response = assertion.response;

    // Convert binary fields to Base64URL
    const authenticatorData = arrayBufferToBase64URL(
      response.authenticatorData
    );
    const clientDataJSON = arrayBufferToBase64URL(response.clientDataJSON);

    const signature = arrayBufferToBase64URL(response.signature);

    const userHandle = arrayBufferToBase64URL(response.userHandle);
    const rawId = arrayBufferToBase64URL(assertion.rawId);

    console.log("assertion", assertion);
    console.log({
      id: assertion.id,
      rawId: rawId,
      type: assertion.type,
      challenge: data.challenge,
      response: {
        authenticatorData: authenticatorData,
        clientDataJSON: clientDataJSON,
        signature: signature,
        userHandle: userHandle,
      },
    });

    return {
      id: assertion.id,
      rawId: rawId,
      type: assertion.type,
      challenge: data.challenge,
      response: {
        authenticatorData: authenticatorData,
        clientDataJSON: clientDataJSON,
        signature: signature,
        userHandle: userHandle,
      },
    };
  } catch (error) {
    console.error("Error verifying credential:", error);
    return null;
  }
}
