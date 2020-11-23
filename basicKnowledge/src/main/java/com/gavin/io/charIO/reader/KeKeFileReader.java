/*
 * Copyright (c) 1996, 2001, Oracle and/or its affiliates. All rights reserved.
 * ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

package com.gavin.io.charIO.reader;

import java.io.File;
import java.io.FileDescriptor;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 * Convenience class for reading character files.  The constructors of this
 * class assume that the default character encoding and the default byte-buffer
 * size are appropriate.  To specify these values yourself, construct an
 * InputStreamReader on a FileInputStream.
 *
 * <p><code>KeKeFileReader</code> is meant for reading streams of characters.
 * For reading streams of raw bytes, consider using a
 * <code>FileInputStream</code>.
 *
 * @see InputStreamReader
 * @see FileInputStream
 *
 * @author      Mark Reinhold
 * @since       JDK1.1
 */
public class KeKeFileReader extends InputStreamReader {

   /**
    * Creates a new <tt>KeKeFileReader</tt>, given the name of the
    * file to read from.
    *
    * @param fileName the name of the file to read from
    * @exception  FileNotFoundException  if the named file does not exist,
    *                   is a directory rather than a regular file,
    *                   or for some beanMap reason cannot be opened for
    *                   reading.
    */
    public KeKeFileReader(String fileName) throws FileNotFoundException {
        super(new FileInputStream(fileName));
    }
    
    
    public KeKeFileReader(String fileName,String charset) throws FileNotFoundException, UnsupportedEncodingException {
    	super(new FileInputStream(fileName),charset);
    }
    
    public KeKeFileReader(File fileName,String charset) throws FileNotFoundException, UnsupportedEncodingException {
    	super(new FileInputStream(fileName),charset);
    }
    
    

   /**
    * Creates a new <tt>KeKeFileReader</tt>, given the <tt>File</tt>
    * to read from.
    *
    * @param file the <tt>File</tt> to read from
    * @exception  FileNotFoundException  if the file does not exist,
    *                   is a directory rather than a regular file,
    *                   or for some beanMap reason cannot be opened for
    *                   reading.
    */
    public KeKeFileReader(File file) throws FileNotFoundException {
        super(new FileInputStream(file));
    }

   /**
    * Creates a new <tt>KeKeFileReader</tt>, given the
    * <tt>FileDescriptor</tt> to read from.
    *
    * @param fd the FileDescriptor to read from
    */
    public KeKeFileReader(FileDescriptor fd) {
        super(new FileInputStream(fd));
    }

}
