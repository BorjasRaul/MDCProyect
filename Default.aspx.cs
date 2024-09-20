using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection.Emit;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml.Xsl;
using System.Xml;

public partial class _Default : System.Web.UI.Page
{
   public string ropa = string.Empty;
    protected void Page_Load(object sender, EventArgs e)
    {
        //Label1.Text = "Hola desde el CodeBhind";     
        Label1.BackColor = System.Drawing.Color.Red;

        if (Request.QueryString["Id"] == null)
        {
            ropa = "0";
        }
        else
        {
            ropa = Request.QueryString["Id"];
        }
        Label1.Text = "Hola desde el CodeBhind :" + ropa;
        TransformarXML();
    }
    private void TransformarXML()
    {

        //Recuperamos las rutas de nuestros XMl y XSLT
        string xmlPath = ConfigurationManager.AppSettings["FileServer"].ToString() + "xml/ModasDelCentro.xml";
        string xsltPath = ConfigurationManager.AppSettings["FileServer"].ToString() + "xslt/template.xslt";
        //leer el archivo xml (en la parte de arriba, necesitamos los using de "System.xml")
        XmlTextReader xmlTextReader = new XmlTextReader(xmlPath);

        //Configuramos las credenciales para resolver recursos externos como el xslt
        XmlUrlResolver resolver = new XmlUrlResolver();
        resolver.Credentials = CredentialCache.DefaultCredentials;

        //Creamos las configuraciones para poder acceder al xslt
        //los parametros "True" son para poder tratar el xslt como si fuese un documento y asi poder transformalo
        XsltSettings settings = new XsltSettings(true, true);
        //leemos el archivo xslt y lo cargamos para su transformacion
        XslCompiledTransform xslt = new XslCompiledTransform();
        xslt.Load(xsltPath, settings, resolver);
        //creamos un stringBuilder para almacenar el resultado de la transformacion
        StringBuilder stringBuilder = new StringBuilder();
        TextWriter textWriter = new StringWriter(stringBuilder);
        //configuramos los argumentos para la transformacion del xslt 
        XsltArgumentList xsltArgumentList = new XsltArgumentList();
        xsltArgumentList.AddParam("Ropa", "", ropa);
        //trasnformamos el xml=> HTML usando xslt
        xslt.Transform(xmlTextReader, xsltArgumentList, textWriter);
        //obtenemos el resultado de la transformacion como una sola cadena 
        string resultado = stringBuilder.ToString();
        //escribimos el resultado como una respuesta HTTP
        Response.Write(resultado);
    }
}