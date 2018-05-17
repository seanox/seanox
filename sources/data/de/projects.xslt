<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html"/>
  <xsl:template name="project">
    <xsl:param name="project"/>
    <h2>
      <span>
        <xsl:value-of select="title"/>
      </span>
      <span>
        <xsl:value-of select="@version"/>
      </span>
      <span>
        <xsl:value-of select="note"/>
      </span>
    </h2>
    <p escaping="on">
      <xsl:value-of select="description"/>
    </p>
    <p>
      <a href="#project">Weitere Informationen</a>
    </p>  
  </xsl:template>  

  <xsl:template match="/">
    <xsl:for-each select="/collection/project/group[not(. = ../following-sibling::project/group)]">
      <xsl:sort select="." order="ascending"/>
      <xsl:variable name="group" select="."/>
      <xsl:if test="$group != 'Experimental'">
        <div>
          <h3>
            <xsl:value-of select="$group"/>
          </h3>
          <xsl:for-each select="/collection/project[group = $group]">
            <xsl:call-template name="project">
              <xsl:with-param name="project" select="."/>
            </xsl:call-template>
          </xsl:for-each>
        </div>
      </xsl:if>
    </xsl:for-each>
    <xsl:variable name="group" select="'Experimental'"/>
    <xsl:if test="count(/collection/project/group[. = $group]) > 0">
      <div>
        <h3>
          <xsl:value-of select="$group"/>
        </h3>
        <xsl:for-each select="/collection/project[group = $group]">
          <xsl:call-template name="project">
            <xsl:with-param name="project" select="."/>
          </xsl:call-template>
        </xsl:for-each>
      </div>
    </xsl:if>
  </xsl:template>
</xsl:stylesheet>