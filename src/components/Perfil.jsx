import React from "react";
import { UsuarioContext } from "../context/UsuarioProvider";


const Perfil = () => {
  const { usuario, editarFoto, actualizarUsuario } = React.useContext(
    UsuarioContext
  );

  console.log("user detectado", usuario);

  const [nombreUsuario, setNombreUsuario] = React.useState(usuario.displayName);
  const [activarFormulario, setActivarFormulario] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const editarUsuario = (e) => {
    e.preventDefault();
    console.log("nombre detectado", nombreUsuario);
    if (!nombreUsuario.trim()) {
      console.log("Nombre Vacío");
      return;
    }
    actualizarUsuario(usuario, nombreUsuario);
    setActivarFormulario(false);
  };

  const [error, setError] = React.useState(false);

  const seleccionarArchivo = (imagen) => {
    console.log("imagen elegida", imagen.target.files[0]);

    const imagenCliente = imagen.target.files[0];

   

    if (imagenCliente === undefined) {
      console.log("no se seleccionó imagen");
      return;
    }

    if (
      imagenCliente.type === "image/png" ||
      imagenCliente.type === "image/jpeg" ||
      imagenCliente.type === "image/jpg"
    ) {
      usuario.estado = false;
      editarFoto(usuario, imagenCliente);
      setLoading(true);
      setError(false);
      //console.log("loading", loading);
    } else {
      setError(true);
    }
    // setLoading(false)
    // console.log('loading', loading)
  };

  return (
    <>
      

      <div className="mt-5 text-center">
        <div className="card m-5" style={{width: 300}} >
          <div className="card-body">
          { 
                (usuario.photoURL) ? (
                    <img
                    src={usuario.photoURL}
                    alt="foto"
                    width="100px"
                    className="img-fluid"
                            />
                ) : (
                    <div className="image red card">
                       <img className="ui medium circular image" alt="logo" />
                    </div>
                )

          }
            
            <h5 className="card-title">Nombre: {usuario.displayName}</h5>
            <p className="card-text mb-2">Email: {usuario.email}</p>
            <button
              className="btn btn-dark"
              onClick={() => setActivarFormulario(true)}
            >
              Editar Nombre
            </button>

            {error && (
              <div className="alert alert-warning mt-3">
                Solo archivos .png o .jpg
              </div>
            )}

            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="inputGroupFile01"
                style={{ display: "none" }}
                onChange={(e) => seleccionarArchivo(e)}
                //disabled={loading}
              />
              <label className={"btn btn-dark mt-2"} htmlFor="inputGroupFile01">
                Actualizar Imagen
              </label>
            </div>
          </div>


{!usuario.estado && (
            <div className="card-body">
              <div className="d-flex justify-content-center my-3">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          )}



          

          {activarFormulario && (
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      style={{width: 250}}
                      value={nombreUsuario}
                      onChange={(e) => setNombreUsuario(e.target.value)}
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-dark"
                        type="submit"
                        onClick={editarUsuario}
                      >
                        Actualizar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Perfil;
