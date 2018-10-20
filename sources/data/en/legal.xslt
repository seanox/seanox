<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template match="/">
    <header>
      <h1>{{Messages['legal.title']}}</h1>
    </header>
    <article> 
      <xsl:value-of select="."/>
    </article>
  </xsl:template>
</xsl:stylesheet>